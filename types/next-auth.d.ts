import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// In order to use custom properties for users, like `role`,
// you need to extend the `Session` and `User` types from NextAuth.
// See https://authjs.dev/getting-started/typescript

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}
