import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { sendMagicLink } from '$lib/server/email';

export const actions = {
    login: async ({ request, url }) => {
        const data = await request.formData();
        const email = data.get('email');

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return fail(404, { success: false, message: 'Dit e-mailadres staat niet in de lijst!' });
        }

        // Genereer de token en sla op
        const token = crypto.randomUUID();
        const expires = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.user.update({
            where: { email },
            data: { loginToken: token, tokenExpiresAt: expires }
        });

        // Maak de link en verstuur de mail
        const magicLink = `${url.origin}/auth?token=${token}`;
        const emailSent = await sendMagicLink(email, magicLink);

        if (!emailSent) {
            return fail(500, { success: false, message: 'Mail kon niet verstuurd worden.' });
        }

        return { 
            success: true, 
            message: 'Check je mailbox! We hebben je een inloglink gestuurd.' 
        };
    }
};