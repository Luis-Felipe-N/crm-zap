import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authConfig = {
  providers: [CredentialsProvider],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
