import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');

        // 1. Check in de database of deze gebruiker bestaat
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        // 2. Als de gebruiker gevonden is: cookie uitdelen
        if (user) {
            cookies.set('keet-sessie', user.id, {
                path: '/',
                httpOnly: true, // Veiligheid: niet leesbaar via JavaScript
                maxAge: 60 * 60 * 24 * 7, // 1 week geldig
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production' // Alleen over HTTPS in productie
            });
            
            // 3. Stuur door naar de hoofdpagina
            throw redirect(303, '/uitjes');
        }

        // 4. Als niet gevonden: geef een duidelijke foutmelding terug
        return { 
            success: false, 
            message: 'Dit e-mailadres staat niet in de lijst!' 
        };
    }
};