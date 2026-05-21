import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

// Initialiseer de Supabase client voor server-side operaties
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const bestand = data.get('afbeelding');
        
        // 1. Upload het bestand naar Supabase Storage
        // We gebruiken een unieke naam om conflicten te voorkomen
        const bestandsNaam = `${crypto.randomUUID()}-${bestand.name}`;
        
        const { error: uploadError } = await supabase.storage
            .from('uitjes-fotos') // Zorg dat deze bucketnaam exact klopt in je dashboard
            .upload(bestandsNaam, bestand);

        if (uploadError) {
            console.error("Upload mislukt:", uploadError);
            return { success: false, error: 'Foto uploaden mislukt' };
        }

        // 2. Verkrijg de publieke URL van het geüploade bestand
        const { data: publicUrlData } = supabase.storage
            .from('uitjes-fotos')
            .getPublicUrl(bestandsNaam);

        // 3. Sla de data op in je PostgreSQL database via Prisma
        try {
            await prisma.uitje.create({
                data: {
                    titel: data.get('titel'),
                    locatie: data.get('locatie'),
                    datum: data.get('datum'),
                    slug: data.get('titel').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    coverFoto: publicUrlData.publicUrl, // De link naar de cloud-foto
                    beschrijving: "Nog geen beschrijving"
                }
            });
        } catch (error) {
            console.error("Database fout:", error);
            return { success: false, error: 'Database opslag mislukt' };
        }

        // 4. Succesvolle afronding
        throw redirect(303, '/uitjes');
    }
};