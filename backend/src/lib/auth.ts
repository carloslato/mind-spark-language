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
    trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
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