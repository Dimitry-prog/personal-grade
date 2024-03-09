import Credentials from '@auth/core/providers/credentials';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';

import { loginSchema } from '@/features/auth/validation';
import { getUserByEmail } from '@/services/user';

export default {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
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
    Credentials({
      async authorize(credentials) {
        const validatedField = loginSchema.safeParse(credentials);

        if (validatedField.success) {
          const { email, password } = validatedField.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
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
