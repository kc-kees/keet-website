import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    // 1. Check of de bezoeker is ingelogd (voor de knoppen)
    const sessie = cookies.get('keet-sessie');
    let isIngelogd = false;

    if (sessie) {
        const user = await prisma.user.findUnique({ where: { id: sessie } });
        if (user) isIngelogd = true;
    }

    // 2. Haal simpelweg alle spelers op en sorteer op score
    const spelers = await prisma.speler.findMany({
        orderBy: { bussenCount: 'desc' }
    });

    return { 
        spelers,
        isIngelogd
    };
};

export const actions = {
    // ACTIE 1: Een nieuwe speler toevoegen
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
            // Foutmelding als je bijvoorbeeld twee keer "Kaylan" probeert toe te voegen
            return fail(400, { message: 'Deze speler staat al op het leaderboard!' });
        }
    },

    // ACTIE 2: De teller met +1 verhogen
    plusEen: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { message: 'Er is iets misgegaan.' });

        // Update simpelweg de Speler tabel
        await prisma.speler.update({
            where: { id: id },
            data: { bussenCount: { increment: 1 } }
        });

        return { success: true };
    }
};