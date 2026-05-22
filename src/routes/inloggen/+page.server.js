import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, url }) => {
        const data = await request.formData();
        const email = data.get('email');

        // 1. Check in de database of deze gebruiker bestaat
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            // Geef de foutmelding terug, net als in je oude code
            return fail(404, { 
                success: false, 
                message: 'Dit e-mailadres staat niet in de lijst!' 
            });
        }

        // 2. Gebruiker gevonden! Genereer een unieke token en verloopdatum (15 minuten)
        const token = crypto.randomUUID();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        // 3. Sla de token op in de database bij deze specifieke gebruiker
        await prisma.user.update({
            where: { email: email },
            data: {
                loginToken: token,
                tokenExpiresAt: expires
            }
        });

        // 4. Maak de Magic Link aan (url.origin pakt automatisch je basis-URL zoals localhost:5173)
        const magicLink = `${url.origin}/auth?token=${token}`;

        // 5. SIMULATIE: Print de link in je terminal in plaats van een mail te sturen
        console.log('\n======================================================');
        console.log(`✉️  NIEUWE INLOG AANVRAAG VOOR: ${email}`);
        console.log(`🔗 KLIK HIER OM IN TE LOGGEN:`);
        console.log(magicLink);
        console.log('======================================================\n');

        // 6. Geef door aan je frontend (+page.svelte) dat de link is "verstuurd"
        return { 
            success: true, 
            message: 'Inloglink is aangemaakt! (Check de terminal waar SvelteKit draait)' 
        };
    }
};