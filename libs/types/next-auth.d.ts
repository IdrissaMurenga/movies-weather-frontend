import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
      id: string;
      email: string;
      city: string;
      apiToken: string;
    }

    interface Session {
      user: {
        id: string;
        email: string;
        city: string;
        apiToken: string;
      } & DefaultSession["user"];
      city; string;
      apiToken; string;
    }

    interface JWT {
      id: string;
      email: string;
      city: string;
      apiToken: string;
    }
}
