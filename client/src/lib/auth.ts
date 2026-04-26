import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
  advanced: {
    cookiePrefix: "better-auth", // Mantiene el prefijo consistente
    crossSubdomainCookies: {
      enabled: false, // No son subdominios compartidos en Render
    },
    defaultCookieAttributes: isProduction
      ? {
          secure: true,
          sameSite: "none",
          httpOnly: true,
          path: "/",
        }
      : {
          secure: false,
          sameSite: "lax",
          httpOnly: true,
          path: "/",
        },
  },
});
