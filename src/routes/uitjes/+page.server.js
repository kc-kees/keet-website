import prisma from '$lib/server/prisma';
export async function load() {
    console.log("SERVER LOAD AANGEROEPEN");
    const uitjes = await prisma.uitje.findMany();
    return { uitjes };
}