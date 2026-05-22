import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

export async function sendMagicLink(toEmail, magicLink) {
    const mailOptions = {
        from: `"De Keet" <${EMAIL_USER}>`,
        to: toEmail,
        subject: 'Jouw Inloglink voor De Keet 🍻',
        html: `
            <div style="font-family: sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #f97316;">Inloggen bij De Keet</h2>
                <p>Hey daar!</p>
                <p>Klik op de knop hieronder om direct in te loggen. Deze link is 15 minuten geldig.</p>
                <a href="${magicLink}" style="display: inline-block; background-color: #09090b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
                    Log direct in
                </a>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Fout bij mailen:", error);
        return false;
    }
}