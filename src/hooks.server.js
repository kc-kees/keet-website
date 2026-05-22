import { prisma } from '$lib/server/prisma';

export async function handle({ event, resolve }) {
    const sessieId = event.cookies.get('keet-sessie');

    if (sessieId) {
        const user = await prisma.user.findUnique({
            where: { id: sessieId }
        });
        
        if (user) {
            event.locals.user = user;
        }
    }

    return await resolve(event);
}