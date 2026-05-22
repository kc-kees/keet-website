import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    // Beveiliging: Alleen jij mag dit zien
    if (locals.user?.rol !== 'ADMIN') throw error(403, 'Verboden');

    const users = await prisma.user.findMany({ orderBy: { email: 'asc' } });
    return { users };
};

export const actions = {
    add: async ({ request, locals }) => {
        if (locals.user?.rol !== 'ADMIN') throw error(403, 'Verboden');
        
        const data = await request.formData();
        const email = data.get('email');
        const rol = data.get('rol');

        await prisma.user.create({ data: { email, rol } });
        return { success: true };
    },
    
    delete: async ({ request, locals }) => {
        if (locals.user?.rol !== 'ADMIN') throw error(403, 'Verboden');
        
        const data = await request.formData();
        const id = data.get('id');
        await prisma.user.delete({ where: { id } });
        return { success: true };
    }
};