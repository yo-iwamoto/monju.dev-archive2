import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@/config/env';
import { prisma } from '@/server/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';

export const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      userId: user.id,
    }),
  },
} satisfies NextAuthOptions;
