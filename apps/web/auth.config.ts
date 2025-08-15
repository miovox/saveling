import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { AuthService } from '@/services/auth.service';

const LoginSchema = z.object({
  handle: z.string().min(1),
  password: z.string().min(1)
});

export default {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'family-credentials',
      credentials: {
        handle: { label: 'Family Handle', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const validation = LoginSchema.safeParse(credentials);
        
        if (!validation.success) {
          return null;
        }

        const { handle, password } = validation.data;
        
        try {
          const authService = AuthService.create();
          const family = await authService.validateFamily({ handle, password });
          
          if (!family) {
            return null;
          }

          return {
            id: family.id,
            name: family.displayName,
            handle: family.handle
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.handle = (user as any).handle;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.handle) {
        (session.user as any).handle = token.handle;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;