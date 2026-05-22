import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';

// Initialiseer de Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// 1. DE LOAD FUNCTIE (Haalt de data op voor de pagina)
export const load = async ({ params, locals }) => {
    const { slug } = params;

    const uitje = await prisma.uitje.findUnique({
        where: {
            slug: slug
        },
        include: {
            fotos: {
                orderBy: {
                    toegevoegdOp: 'desc' // Nieuwste foto's bovenaan
                }
            }
        }
    });

    if (!uitje) {
        throw error(404, 'Dit uitje of album bestaat niet');
    }

    return {
        uitje,
        user: locals.user // We geven de user ook door, zodat we in de Svelte file kunnen checken of ze admin zijn
    };
};

// 2. DE ACTIONS (Handelt de upload-knop af)
export const actions = {
    upload: async ({ request, params }) => {
        const data = await request.formData();
        
        // DIT IS NIEUW: getAll haalt een lijst op van álle geselecteerde foto's
        const bestanden = data.getAll('foto'); 

        // Filter lege of ongeldige bestanden eruit
        const geldigeBestanden = bestanden.filter(b => b.name && b.name !== 'undefined' && b.size > 0);

        if (geldigeBestanden.length === 0) {
            return fail(400, { success: false, message: 'Geen geldige bestanden geselecteerd' });
        }

        // Stap A: Zoek het uitje op basis van de URL
        const uitje = await prisma.uitje.findUnique({
            where: { slug: params.slug },
            select: { id: true }
        });

        if (!uitje) {
            return fail(404, { success: false, message: 'Uitje niet gevonden in de database' });
        }

        // DIT IS NIEUW: We loopen door alle geselecteerde foto's heen!
        for (const bestand of geldigeBestanden) {
            
            // Maak bestandsnaam schoon
            const schoneNaam = bestand.name.replace(/[^a-zA-Z0-9.-]/g, '');
            const bestandsNaam = `${crypto.randomUUID()}-${schoneNaam}`;
            
            // Upload naar Supabase
            const { error: uploadError } = await supabase.storage
                .from('uitjes-fotos') 
                .upload(bestandsNaam, bestand);

            if (uploadError) {
                console.error(`Upload mislukt voor ${bestand.name}:`, uploadError);
                continue; // Als er 1 foto mislukt, sla hem over en ga door met de rest!
            }

            // Haal de publieke URL op
            const { data: publicUrlData } = supabase.storage
                .from('uitjes-fotos')
                .getPublicUrl(bestandsNaam);

            // Sla op in Prisma
            try {
                await prisma.albumFoto.create({
                    data: {
                        url: publicUrlData.publicUrl,
                        uitjeId: uitje.id 
                    }
                });
            } catch (dbError) {
                console.error(`Database fout voor ${bestand.name}:`, dbError);
            }
        }

        // Als de hele loop klaar is, ververs de pagina!
        return { success: true };
    },


    delete: async ({ request }) => {
        const data = await request.formData();
        const fotoId = data.get('fotoId');
        const fotoUrl = data.get('fotoUrl');

        if (!fotoId || !fotoUrl) {
            return fail(400, { success: false, message: 'Missende gegevens' });
        }

        try {
            // 1. Verwijder het bestand uit Supabase Storage
            // De URL ziet eruit als: https://[...].supabase.co/storage/v1/object/public/uitjes-fotos/[bestandsnaam]
            // We knippen de URL in stukjes bij elke '/' en pakken het allerlaatste stukje (de bestandsnaam).
            const urlOnderdelen = fotoUrl.split('/');
            const bestandsNaam = urlOnderdelen[urlOnderdelen.length - 1];

            const { error: supabaseError } = await supabase.storage
                .from('uitjes-fotos')
                .remove([bestandsNaam]);

            if (supabaseError) {
                console.error("Kon foto niet uit Supabase verwijderen:", supabaseError);
                // We returnen nog geen error, want we willen hem sws uit de Prisma database halen!
            }

            // 2. Verwijder de referentie uit je database
            await prisma.albumFoto.delete({
                where: { id: fotoId }
            });

            return { success: true };

        } catch (error) {
            console.error("Database fout bij verwijderen:", error);
            return fail(500, { success: false, message: 'Fout bij verwijderen van de foto' });
        }
        return { success: true };
    }
};