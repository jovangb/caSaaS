import NextAuth, { DefaultSession } from "next-auth";

// We are expanding the built-in "next-auth" modules
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop 
   * on the `SessionProvider` React Context
   */
  interface User {
    role: string;
    tenantId: string;
  }

  interface Session {
    user: {
      role: string;
      tenantId: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role: string;
    tenantId: string;
  }
}