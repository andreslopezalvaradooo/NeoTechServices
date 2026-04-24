import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, updateUser } =
  createAuthClient({
    // Debe coincidir con la URL desde donde accede el browser
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
  });