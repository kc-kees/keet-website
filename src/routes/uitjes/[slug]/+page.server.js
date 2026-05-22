import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';
import prisma from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';

// Initialiseer de Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// 1. DE LOAD FUNCTIE (Haalt de data op voor de pagina)
export const load = async ({ params }) => {
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
        uitje
    };
};

// 2. DE ACTIONS (Handelt de upload-knop af)
export const actions = {
    // Dit is de "?/upload" actie uit je Svelte formulier
    upload: async ({ request, params }) => {
        const data = await request.formData();
        const bestand = data.get('foto'); // Let op: in het formulier heet het veld 'foto'

        // Check of er daadwerkelijk een bestand is meegegeven
        if (!bestand || bestand.name === 'undefined' || bestand.size === 0) {
            return fail(400, { success: false, message: 'Geen geldig bestand geselecteerd' });
        }

        // Stap A: Zoek het ID van dit specifieke uitje op basis van de URL (slug)
        const uitje = await prisma.uitje.findUnique({
            where: { slug: params.slug },
            select: { id: true }
        });

        if (!uitje) {
            return fail(404, { success: false, message: 'Uitje niet gevonden in de database' });
        }

        // Stap B: Upload naar Supabase Storage
        // We halen spaties en rare tekens uit de bestandsnaam voor de zekerheid
        const schoneNaam = bestand.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const bestandsNaam = `${crypto.randomUUID()}-${schoneNaam}`;
        
        const { error: uploadError } = await supabase.storage
            .from('uitjes-fotos') // We gebruiken dezelfde bucket als de coverfoto's
            .upload(bestandsNaam, bestand);

        if (uploadError) {
            console.error("Upload mislukt:", uploadError);
            return fail(500, { success: false, message: 'Foto uploaden naar cloud mislukt' });
        }

        // Stap C: Haal de publieke URL op van Supabase
        const { data: publicUrlData } = supabase.storage
            .from('uitjes-fotos')
            .getPublicUrl(bestandsNaam);

        // Stap D: Sla de URL én de koppeling met het Uitje op in Prisma
        try {
            await prisma.albumFoto.create({
                data: {
                    url: publicUrlData.publicUrl,
                    uitjeId: uitje.id // Hier leggen we de 1-op-N relatie!
                }
            });
        } catch (dbError) {
            console.error("Database fout:", dbError);
            return fail(500, { success: false, message: 'Database opslag mislukt' });
        }

        // SvelteKit zal nu automatisch de pagina updaten met de nieuwe foto!
        return { success: true };
    }
};