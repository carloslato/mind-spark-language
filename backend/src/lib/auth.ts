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
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000", process.env.SERVICE_URL_FRONTEND || 'http://w4cg8kow84ww884884oo8g08.146.235.223.8.sslip.io'],
    plugins: [ 
        openAPI(), 
    ],
    defaultCookieAttributes: {
      sameSite: "none",
      // secure: true,
      partitioned: true // New browser standards will mandate this for foreign cookies
    },
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
});