import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URI!;
if (!GRAPHQL_URI) {
  // Fail fast at boot if misconfigured
  throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URI");
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
      Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URI;
      if (!GRAPHQL_URI) throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URI");

      if (!credentials?.email || !credentials?.password) {
        
        return null;
      }

      const query = `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            token
            user { id email name city }
          }
        }
      `;

      const res = await fetch(GRAPHQL_URI, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          query,
          variables: { input: { email: credentials.email, password: credentials.password } },
        }),
      });

      if (!res.ok) throw new Error(`Auth server unavailable (${res.status})`);

      const json = await res.json();


      if (json?.errors?.length) {
        const first = json.errors[0];
        const code = first?.extensions?.code;
        const msg = first?.message || "Login failed";

        if (code === "UNAUTHENTICATED" || /invalid|unauthoriz/i.test(msg)) {
          return null;
        }

        throw new InvalidLoginError();
      }

      const login = json?.data?.login;
      const token = login?.token ?? login?.accessToken ?? login?.jwt ?? login?.access_token;
      if (!token || !login?.user?.id) {
        
        return null;
      }

      return {
        id: login.user.id,
        email: login.user.email ?? credentials.email,
        name: login.user.name ?? "",
        city: login.user.city ?? null,
        accessToken: token, 
      } as any;
    } catch (err) {
      // Keep the message short; details are in your server logs/Network panel
      throw new Error("Unexpected error during login");
    }
  },
})

  ],
  callbacks: {
    async jwt({ token, user }) {
      if ((user as any)?.accessToken) (token as any).accessToken = (user as any).accessToken;
      if (user?.id) token.id = user.id as string;
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      if (session.user && token.id) (session.user as any).id = token.id as string;
      return session;
    },
  },
});
