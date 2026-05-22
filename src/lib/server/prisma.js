import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Verander deze lijn naar 'export const prisma'
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}