// lib/auth.ts (or libs/auth.ts)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const GRAPHQL_URI =
  process.env.AUTH_GRAPHQL_URL ?? process.env.GRAPHQL_URI ?? "http://127.0.0.1:4000/graphql";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const query = `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              token
              user {
                id
                email
                name
                city
                weather {
                  city
                  temp
                  description
                  iconUrl
                }
              }
            }
          }
        `;

        const res = await fetch(GRAPHQL_URI, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            query,
            variables: { input: { email: credentials.email, password: credentials.password } },
          }),
        });

        if (!res.ok) {
          const t = await res.text().catch(() => "");
          console.error("Login fetch non-OK:", res.status, t);
          throw new Error("Auth server unavailable");
        }

        const json = await res.json();
        if (json?.errors?.length) {
          throw new Error(json.errors[0]?.message || "Login failed");
        }

        const login = json?.data?.login;
        const token =
          login?.token ?? login?.accessToken ?? login?.jwt ?? login?.access_token;

        if (!token) {
          throw new Error("Invalid email or password");
        }

        const u = login.user ?? {};
        // ⬇️ Return the token on the "user" so jwt() can copy it into the Auth.js JWT
        return {
          id: u.id ?? "unknown",
          email: u.email ?? credentials.email,
          name: u.name ?? "",
          city: u.city ?? null,
          accessToken: token, // <-- important
        } as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // carry over the app's JWT on first sign-in
      if ((user as any)?.accessToken) {
        (token as any).accessToken = (user as any).accessToken;
      }
      // keep an id if you want
      if (user?.id) token.id = user.id as string;
      return token;
    },
    async session({ session, token }) {
      // expose it to the client so Apollo can read it
      (session as any).accessToken = (token as any).accessToken;
      if (session.user && token.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
});
