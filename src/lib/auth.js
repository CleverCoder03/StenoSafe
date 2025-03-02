import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; 
import CredentialsProvider from "next-auth/providers/credentials"; 
import { connectToDB } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";


const login = async (credentials) => {
  try {
    await connectToDB(); // Ensure database connection before querying
    console.log("Database connected");

    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      console.log("User not found:", credentials.username);
      throw new Error("Invalid username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      console.log("Incorrect password for:", credentials.username);
      throw new Error("Invalid username or password");
    }

    return user;
  } catch (err) {
    console.error("Login error:", err.message);
    throw new Error("Failed to login!"); // Generic error to avoid exposing details
  }
};


export const { handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          if (!user) {
            throw new Error("Invalid username or password");
          }
          return user;
        } catch (err) {
          console.error("Authorization error:", err.message);
          throw new Error("Invalid username or password"); // Always return a generic error
        }
      },
    }),
  ],
  callbacks:{
    async signIn({user, account, profile}){
      // console.log(user,account,profile)
      if (account.provider == 'github'){
        connectToDB();
        try{
          const user = await User.findOne({email: profile.email})

          if(!user){
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url
            })
            await newUser.save()
          }

        } catch(err){
          console.log(err.message)
          return false
        }
      }
      return true
    },
    ...authConfig.callbacks,
  }
});
