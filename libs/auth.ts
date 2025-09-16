import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const GRAPHQL_URI = process.env.GRAPHQL_URI as string

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password:{}
      },
      authorize: async (credentials) => {
        
        // user login mutation
        const mutation = `
          mutation Login ($input:LoginInput!){
            login(input: $input) {
              user {
                id
                name
                email
              }
              token
            }
          }
        `
        //fetch user
        const res = await fetch(GRAPHQL_URI, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mutation,
            variables: { input: { email: credentials.email, password: credentials.password } }
          })
        })
        const results = await res.json()

        const login = results.data.login
        if (!login?.token) {
          throw new Error(results?.errors?.[0]?.message ?? "Login failed");
        }
        return {
          id: login.user?.id,
          name: login.user?.userName,
          email: login.user?.email,
          apiToken: login.token
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any
        token.id = u.id;
        token.email = u.email;
        token.apiToken = u.apiToken;
        if (u.apiToken) token.apiToken = u.apiToken;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token as any).sub ?? session.user.id;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      (session as any).apiToken = (token as any).apiToken;
      return session;
    },
  }
});