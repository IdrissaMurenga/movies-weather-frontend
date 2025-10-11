import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Incorrect password or invalid credentials"
}

const GRAPHQL_URI = process.env.GRAPHQL_URI as string

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password:{}
      },
      authorize: async (credentials) => {
        //check if user's are valid if not return null
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

        // throw error if fetch request fails (server/network issue)
        if (!res.ok) {
          throw new InvalidLoginError(`Login request failed (${res.status})`);
        }

        // convert response into a json file
        const results = await res.json()

        // get logged in user's data
        const login = results?.data?.login ?? null;

        // check if token exist and user's id exist
        if (!login?.token || !login?.user?.id) {
          throw new InvalidLoginError();
        }

        // return user data with token
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
  },
  // session will use jwt method to save into cookies
  session: { strategy: "jwt" },

  /** Silence expected invalid-login error in server console */
  logger: {
    error(error) {},
    warn(code) {},
    debug(code, ...args) {},
  },
});