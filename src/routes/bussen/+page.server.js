import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const sessie = cookies.get('keet-sessie');
    let isIngelogd = false;
    let isAdmin = false;

    if (sessie) {
        const user = await prisma.user.findUnique({ where: { id: sessie } });
        if (user) {
            isIngelogd = true;
            if (user.rol === 'ADMIN') {
                isAdmin = true;
            }
        }
    }

    const spelers = await prisma.speler.findMany({
        orderBy: { bussenCount: 'desc' }
    });

    return { 
        spelers,
        isIngelogd,
        isAdmin
    };
};

export const actions = {
    voegSpelerToe: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan, je moet ingelogd zijn!' });

        const data = await request.formData();
        const naam = data.get('naam')?.toString().trim();

        if (!naam) return fail(400, { message: 'Vul een naam in voor de speler.' });

        try {
            await prisma.speler.create({
                data: { naam: naam }
            });
            return { success: true };
        } catch (error) {
            return fail(400, { message: 'Deze speler staat al op het leaderboard!' });
        }
    },

    plusEen: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { message: 'Er is iets misgegaan.' });

        await prisma.speler.update({
            where: { id: id },
            data: { bussenCount: { increment: 1 } }
        });

        return { success: true };
    },

    // NIEUWE ACTIE: De teller met -1 verlagen (met ingebouwde 0-check)
    minEen: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { message: 'Er is iets misgegaan.' });

        // Haal eerst de huidige stand op om te checken of hij niet al op 0 staat
        const speler = await prisma.speler.findUnique({ where: { id: id } });
        
        if (speler && speler.bussenCount > 0) {
            await prisma.speler.update({
                where: { id: id },
                data: { bussenCount: { decrement: 1 } } // Prisma trucje voor -1
            });
        }

        return { success: true };
    },

    verwijderSpeler: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const user = await prisma.user.findUnique({ where: { id: sessie } });
        if (!user || user.rol !== 'ADMIN') {
            return fail(403, { message: 'Alleen admins mogen spelers verwijderen!' });
        }

        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { message: 'Geen speler geselecteerd.' });

        await prisma.speler.delete({
            where: { id: id }
        });

        return { success: true };
    }
};