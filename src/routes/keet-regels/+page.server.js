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

    // Haal alle regels op, gesorteerd op datum van toevoegen
    const regels = await prisma.regel.findMany({
        orderBy: { createdAt: 'asc' }
    });

    return { 
        regels,
        isIngelogd,
        isAdmin
    };
};

export const actions = {
    voegRegelToe: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const user = await prisma.user.findUnique({ where: { id: sessie } });
        if (!user || user.rol !== 'ADMIN') {
            return fail(403, { message: 'Alleen admins mogen het wetboek aanpassen!' });
        }

        const data = await request.formData();
        const titel = data.get('titel')?.toString().trim();
        const tekst = data.get('tekst')?.toString().trim();

        if (!titel || !tekst) return fail(400, { message: 'Vul zowel een titel als de tekst in.' });

        await prisma.regel.create({
            data: { 
                titel: titel,
                tekst: tekst
            }
        });

        return { success: true };
    },

    verwijderRegel: async ({ request, cookies }) => {
        const sessie = cookies.get('keet-sessie');
        if (!sessie) return fail(401, { message: 'Niet toegestaan!' });

        const user = await prisma.user.findUnique({ where: { id: sessie } });
        if (!user || user.rol !== 'ADMIN') {
            return fail(403, { message: 'Alleen admins mogen regels verwijderen!' });
        }

        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { message: 'Geen regel geselecteerd.' });

        await prisma.regel.delete({
            where: { id: id }
        });

        return { success: true };
    }
};