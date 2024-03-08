import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { NextAuthConfig } from 'next-auth';

export default {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ token, session }) {
      return session;
    },
  },
} satisfies NextAuthConfig;
