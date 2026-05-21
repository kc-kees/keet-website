import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    // params.slug bevat de tekst uit de URL (bijv. 'test6')
    const { slug } = params;

    // We zoeken in de database naar het uitje met deze unieke slug
    const uitje = await prisma.uitje.findUnique({
        where: {
            slug: slug
        }
    });

    // Als het uitje niet bestaat in de database, gooien we een nette 404-fout
    if (!uitje) {
        throw error(404, 'Dit uitje of album bestaat niet');
    }

    // We sturen de data door naar de +page.svelte
    return {
        uitje
    };
};