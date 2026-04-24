import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },

  trustedOrigins: [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    process.env.FRONTEND_URL_DEV ?? 'http://192.168.80.40:3000',
  ],
});
