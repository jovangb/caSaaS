import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUser } from "@/app/actions/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        // Simple call to your database logic
        return await validateUser(credentials?.email || "", credentials?.password || "");
      }
    })
  ],
    callbacks: {
        // Transfer data from the database user to the temporary JWT token
        async jwt({ token, user }) {
            if (user) {
            token.role = user.role;
            token.tenantId = user.tenantId;
            }
            return token;
        },
        // Transfer data from the JWT token to the session the browser can see
        async session({ session, token }) {
            if (session.user) {
            session.user.role = token.role;
            session.user.tenantId = token.tenantId;
            }
            return session;
        }
    },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };