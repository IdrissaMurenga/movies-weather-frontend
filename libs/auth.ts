import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
class UserNotFoundError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

const GRAPHQL_URI = process.env.GRAPHQL_URI as string
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  /** Silence expected invalid-login noise in the server console (Auth.js v5 logger types) */
  logger: {
    error(error) {
      // Ignore normal invalid-credential attempts
      if (error?.name === "CredentialsSignin" || (error as any)?.type === "CredentialsSignin") {
        return;
      }
      // Ignore wrapper errors whose cause is CredentialsSignin
      const cause = (error as any)?.cause;
      if (error?.name === "CallbackRouteError" &&
          (cause?.name === "CredentialsSignin" || cause?.type === "CredentialsSignin")) {
        return;
      }
      console.error("[auth][error]", error);
    },
    warn(code) {
      // mute warnings; or use console.warn("[auth][warn]", code)
    },
    debug(code, ...args) {
      // keep quiet; or console.log("[auth][debug]", code, ...args)
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password:{}
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        // user login mutation
        const query = `
          mutation Login ($input:LoginInput!){
            login(input: $input) {
              user {
                id
                name
                email
                city
              }
              token
            }
          }
        `
        //fetch user
        const res = await fetch(GRAPHQL_URI, {
          method: 'POST',
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            query,
            variables: { input: { email: credentials.email, password: credentials.password } }
          })
        })

        // hard failure -> throw (server/network issue)
        if (!res.ok) {
          throw new Error(`Login request failed (${res.status})`);
        }

        const results = await res.json()

        // GraphQL errors -> expected auth failures -> map to friendly messages
        const gqlErr = results?.errors?.[0];
        if (gqlErr) {
          const code = gqlErr?.extensions?.code;
          if (code === "USER_NOT_FOUND") throw new UserNotFoundError();
          if (code === "INCORRECT_PASSWORD") throw new InvalidLoginError();
          throw new InvalidLoginError(); // default fallback
        }

        const login = results?.data?.login ?? null;

        if (!login?.token || !login?.user?.id) {
          throw new InvalidLoginError()
        }

        return {
          id: login.user.id,
          name: login.user.name,
          email: login.user.email,
          city: login.user.city,
          apiToken: login.token
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        token.email = user.email;
        token.city = user.city; 
        token.apiToken = user.apiToken;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token as any).sub ?? session.user.id;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      session.city = token.city; 
      session.apiToken = token.apiToken;
      return session;
    },
  }
});