import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    })
  ],
  // callbacks: {
  //   async signIn({ user, account}: { user: AuthUser, account: Account }){
  //     console.log("account",account.provider);
  //    if(account?.provider == "credentials") {
  //     return true;
  //    }
    //  if(account?.provider == "google") {
    //   await connect();
    //   try {
    //     const existingUser = await User.findOne({email: user.email});
    //     if(!existingUser) {
    //       const newUser = new User({
    //         email: user.email
    //       });
    //       await newUser.save();
    //       return true;
    //     }
    //     return true;
    //   } catch(err) {
    //     console.log("Error Saving User", err);
    //     return false;
    //   }
    //  }
    //  if(account?.provider == "github") {
    //   await connect();
    //   try {
    //     const existingUser = await User.findOne({email: user.email});
    //     if(!existingUser) {
    //       const newUser = new User({
    //         email: user.email
    //       });
    //       await newUser.save();
    //       return true;
    //     }
    //     return true;
    //   } catch(err) {
    //     console.log("Error Saving User", err);
    //     return false;
    //   }
    //  }
  //   }
  // }
};


export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }