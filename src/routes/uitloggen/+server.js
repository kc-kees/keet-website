import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
    // 1. Verwijder de cookie
    cookies.delete('keet-sessie', { path: '/' });
    
    // 2. Stuur de gebruiker door naar de homepage
    throw redirect(303, '/');
};