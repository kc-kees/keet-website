import { prisma } from '$lib/server/prisma';

export async function load({ locals }) {
    // 1. Haal de uitjes op
    const uitjes = await prisma.uitje.findMany();
    
    // 2. Geef zowel de uitjes als de user (voor de admin-check) door
    return { 
        uitjes,
        user: locals.user 
    };
}