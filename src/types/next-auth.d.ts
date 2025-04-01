import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    id?: string;
    name?: string | null;
    last_name?: string | null;
    password?: string | null;
    email : string | null;
    image?: string | null;
    role?: string | null;
  }

} 