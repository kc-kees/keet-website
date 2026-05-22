import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
    // 1. Haal de token uit de URL (alles achter ?token=)
    const token = url.searchParams.get('token');

    if (!token) {
        // Iemand gaat naar /auth zonder token? Stuur ze weg.
        throw redirect(303, '/inloggen');
    }

    // 2. Zoek in de database naar een gebruiker met deze token,
    // én controleer of de verloopdatum nog in de toekomst ligt.
    const user = await prisma.user.findFirst({
        where: {
            loginToken: token,
            tokenExpiresAt: {
                gt: new Date() // 'gt' staat voor Greater Than (groter dan de tijd van nu)
            }
        }
    });

    // 3. Als we niks vinden, is de link ongeldig, verlopen, of al een keer gebruikt.
    if (!user) {
        throw redirect(303, '/inloggen');
    }

    // 4. BINGO! De link is geldig. We loggen de gebruiker in.
    
    // Eerst maken we de token leeg in de database. 
    // Dit is super belangrijk, want een inloglink mag maar 1 keer werken!
    await prisma.user.update({
        where: { id: user.id },
        data: {
            loginToken: null,
            tokenExpiresAt: null
        }
    });

    // 5. Deel de vertrouwde cookie uit, exact zoals in je oude code
    cookies.set('keet-sessie', user.id, {
        path: '/',
        httpOnly: true, // Veiligheid: niet leesbaar via JavaScript
        maxAge: 60 * 60 * 24 * 7, // 1 week geldig
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production' // Alleen via HTTPS als je live gaat
    });

    // 6. Stuur de ingelogde gebruiker door naar de beveiligde omgeving
    throw redirect(303, '/uitjes');
};