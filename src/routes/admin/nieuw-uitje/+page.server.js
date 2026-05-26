import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { redirect, error } from '@sveltejs/kit'; // Voeg 'error' hier toe

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export const actions = {
    default: async ({ request, locals }) => { // 1. Voeg 'locals' toe
        
        // 2. DE ACHTERDEUR DICHT: Check of de gebruiker ADMIN is
        if (!locals.user || locals.user.rol !== 'ADMIN') {
            throw error(403, 'Alleen beheerders mogen nieuwe uitjes aanmaken!');
        }

        const data = await request.formData();
        const bestand = data.get('afbeelding');
        
        // ... (de rest van je bestaande code blijft gelijk)
        const bestandsNaam = `${crypto.randomUUID()}-${bestand.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from('uitjes-fotos')
            .upload(bestandsNaam, bestand);

        if (uploadError) {
            console.error("Upload mislukt:", uploadError);
            return { success: false, error: 'Foto uploaden mislukt' };
        }

        const { data: publicUrlData } = supabase.storage
            .from('uitjes-fotos')
            .getPublicUrl(bestandsNaam);

        try {
            await prisma.uitje.create({
                data: {
                    titel: data.get('titel'),
                    locatie: data.get('locatie'),
                    datum: data.get('datum'),
                    slug: data.get('titel').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    coverFoto: publicUrlData.publicUrl,
                    beschrijving: "Nog geen beschrijving"
                }
            });
        } catch (error) {
            console.error("Database fout:", error);
            return { success: false, error: 'Database opslag mislukt' };
        }

        throw redirect(303, '/uitjes');
    }
};