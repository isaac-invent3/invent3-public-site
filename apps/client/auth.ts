import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Shared promise to track the refresh token process
let refreshTokenPromise: Promise<any> | null = null;
// @ts-ignore
async function refreshAccessToken(token) {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      console.log('Now refreshing the expired token...');
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken: token.accessToken,
              refreshToken: token.refreshToken,
              apiKey: token.apiKey,
            }),
          }
        );

        const { success, data } = await res.json();

        if (!success) {
          console.log('The token could not be refreshed!');
          throw data;
        }

        console.log('The token has been refreshed successfully.');
        const decodedAccessToken = JSON.parse(
          Buffer.from(data.data.accessToken.split('.')[1], 'base64').toString()
        );

        return {
          ...token,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          sessionId: data.data.sessionId,
          accessTokenExpires: decodedAccessToken['exp'] * 1000,
          error: '',
        };
      } catch (error) {
        console.log(error);
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      } finally {
        refreshTokenPromise = null; // Reset the promise after completion
      }
    })();
  }
  return refreshTokenPromise;
}

export const config = {
  trustHost: true,
  providers: [
    // we use credentials provider here
    CredentialsProvider({
      credentials: {
        username: {
          label: 'username',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        // external api for users to log in, change it with your own endpoint
        const res = await fetch(`${process.env.API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(payload),
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.message);
        }

        if (res.ok && user) {
          return { ...user.data, username: credentials.username };
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const decodedAccessToken = JSON.parse(
          Buffer.from(
            user.accessToken.split('.')[1] as string,
            'base64'
          ).toString()
        );

        if (decodedAccessToken) {
          token.id = decodedAccessToken.UserId;
          token.name = decodedAccessToken['nameid'].join(' ');
          token.email = decodedAccessToken['email'];
          token.username = user.username;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.sessionId = user.sessionId;
          token.apiKey = user.apiKey;
          token.role = decodedAccessToken['role']?.[0] ?? 'User';
          token.accessTokenExpires = decodedAccessToken['exp'] * 1000;
        }
      }

      // Update token if triggered by 'update'
      if (trigger === 'update' && session?.user?.email) {
        token.email = session.user.email;
      }

      // If token is still valid, return it
      if (
        token.accessTokenExpires &&
        Date.now() < Number(token.accessTokenExpires) &&
        token.error !== 'RefreshAccessTokenError'
      ) {
        return token;
      }

      // Otherwise, refresh the token
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
          sessionId: token.sessionId as number,
          apiKey: token.apiKey as string,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          role: token.role as string,
        },
        error: token.error,
      };
    },
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(config);
