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
    // Check again if the token has been refreshed after acquiring the lock
    if (refreshedTokens.has(token.accessToken)) {
      console.log('Token was already refreshed while waiting.');
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

    const currentTime = Date.now(); // Current time in milliseconds

    const refreshedToken = {
      ...token,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      sessionId: data.data.sessionId,
      accessTokenExpires: currentTime + data.data.expiresIn * 1000,
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
      const currentTime = Date.now(); // Current time in milliseconds
      if (user) {
        token.id = user.userId;
        token.name = `${user.firstName} ${user.lastName}`;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.sessionId = user.sessionId;
        token.apiKey = user.apiKey;
        token.role = user.role ?? 'User';
      }

      // Set accessTokenExpires if not already set, to prevent resetting it on each callback
      if (!token.accessTokenExpires) {
        token.accessTokenExpires = currentTime + user.expiresIn * 1000;
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

      // Handle mutex logic to avoid race conditions
      if (refreshTokenMutex.isLocked()) {
        console.log('Waiting for the refresh process to complete...');
        await refreshTokenMutex.waitForUnlock();

        // Recheck the refreshedTokens map after waiting
        if (refreshedTokens.has(token.accessToken)) {
          console.log('Using the refreshed token after wait.');
          return refreshedTokens.get(token.accessToken);
        }
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
          firstName: token.firstName as string,
          lastName: token.lastName as string,
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
