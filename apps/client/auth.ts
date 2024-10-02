import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Mutex } from 'async-mutex';

// Create a shared mutex for controlling access to the refresh token process
const refreshTokenMutex = new Mutex();

// Map of refreshed tokens to prevent redundant refreshes
const refreshedTokens = new Map();

// @ts-ignore
async function refreshAccessToken(token) {
  const release = await refreshTokenMutex.acquire();

  try {
    // Check if the token has already been refreshed
    if (refreshedTokens.has(token.accessToken)) {
      return refreshedTokens.get(token.accessToken);
    }

    console.log('Now refreshing the expired token...');
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

    const refreshedToken = {
      ...token,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      sessionId: data.data.sessionId,
      accessTokenExpires: decodedAccessToken['exp'] * 1000,
      error: '',
    };

    // Store the refreshed token in the map
    refreshedTokens.set(token.accessToken, refreshedToken);

    return refreshedToken;
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  } finally {
    release(); // Release the mutex after the refresh process completes
  }
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
      // If the mutex is locked, wait for the refresh to complete
      if (refreshTokenMutex.isLocked()) {
        await refreshTokenMutex.waitForUnlock();
        return token; // Assuming the refreshed token is available after the wait
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
