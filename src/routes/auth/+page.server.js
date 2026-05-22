import { prisma } from '$lib/server/prisma';
import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ url }) => {
    // Geef de token uit de url (?token=xyz) door aan de pagina
    return { token: url.searchParams.get('token') };
};

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const token = data.get('token');

        if (!token) return fail(400, { message: 'Geen token gevonden.' });

        const user = await prisma.user.findFirst({
            where: {
                loginToken: token,
                tokenExpiresAt: { gt: new Date() }
            }
        });

        if (!user) {
            return fail(401, { message: 'Deze link is al gebruikt of verlopen.' });
        }

        // Maak de token leeg
        await prisma.user.update({
            where: { id: user.id },
            data: { loginToken: null, tokenExpiresAt: null }
        });

        // Deel de cookie uit
        cookies.set('keet-sessie', user.id, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        // Stuur door (SvelteKit zal dankzij use:enhance nu netjes alles updaten)
        throw redirect(303, '/uitjes');
    }
};