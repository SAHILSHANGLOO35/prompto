import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },

    async signIn({ profile }) {
      const googleProfile = profile as GoogleProfile;
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: googleProfile?.email,
            username: googleProfile?.name?.replace(/\s+/g, "").toLowerCase(),
            image: googleProfile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(`Error creating user ${error}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
