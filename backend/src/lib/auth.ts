import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@prisma/client';
import { openAPI } from "better-auth/plugins"

const prisma = new PrismaClient();
export const auth = betterAuth({
    emailAndPassword: { 
      enabled: true, 
    },
    plugins: [ 
        openAPI(), 
    ],
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
});