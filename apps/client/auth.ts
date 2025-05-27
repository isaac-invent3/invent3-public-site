import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Mutex } from 'async-mutex';
import { JWT } from 'next-auth/jwt';

const extractTenantFromReferer = (
  referer: string | null
): string | null | undefined => {
  if (!referer) return null;

  try {
    const url = new URL(referer);
    const segments = url.pathname.split('/').filter(Boolean); // Remove empty parts

    if (segments.length >= 2 && segments[1] === 'signin') {
      return segments[0]; // First segment is the tenant name
    }

    return null; // No tenant present
  } catch (error) {
    return null;
  }
};

export const TOKEN_REFRESH_BUFFER_SECONDS = 60; // 5 minutes
const getTimeInSeconds = () => Math.floor(Date.now() / 1000);

// Create a shared mutex for controlling access to the refresh token process
const refreshTokenMutex = new Mutex();

// Map of refreshed tokens to prevent redundant refreshes
const refreshedTokens = new Map();

// @ts-ignore
async function refreshAccessToken(token: JWT) {
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
          companySlug: token.companySlug,
        }),
      }
    );

    const { success, data } = await res.json();

    if (!success) {
      console.log('The token could not be refreshed!');
      throw data;
    }

    console.log('The token has been refreshed successfully.');

    const timeInSeconds = getTimeInSeconds();
    const refreshedToken = {
      ...token,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      sessionId: data.data.sessionId,
      accessTokenExpires: timeInSeconds + data.data.expiresIn,
      error: '',
    };

    // Store the refreshed token in the map
    refreshedTokens.set(token.accessToken, refreshedToken);

    return refreshedToken;
  } catch (error) {
    console.log(error);
    const failedRefresh = {
      ...token,
      error: 'RefreshAccessTokenError',
    };
    // Store the refreshed token in the map
    refreshedTokens.set(token.accessToken, failedRefresh);
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
        code: {
          label: 'code',
          type: 'text',
        },
      },
      async authorize(credentials: Record<string, any>, request) {
        const baseUrl = new URL(request.headers.get('origin') ?? '');
        const envUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? '');
        const subdomain = baseUrl.hostname.split('.')[0];
        const hasSubdomain =
          baseUrl.hostname !== envUrl.hostname ? subdomain : null;
        const tenantName = extractTenantFromReferer(
          request.headers.get('referer')
        );

        if (credentials.accessToken) {
          return {
            ...credentials,
            expiresIn: +credentials?.expiresIn,
            sessionId: +credentials?.sessionId,
            userId: +credentials?.userId,
            companyId: +credentials?.companyId,
            roleIds: JSON.parse(credentials?.roleIds),
            roleSystemModuleContextPermissions: JSON.parse(
              credentials?.roleSystemModuleContextPermissions
            ),
            username: credentials.username,
            // companySlug: hasSubdomain ? subdomain : null,
            companySlug: tenantName,
          };
        }
        const payload = {
          username: credentials.username,
          password: credentials.password,
          otpCode: credentials.code,
        };

        // external api for users to log in
        const res = await fetch(
          `${process.env.API_BASE_URL}/api/Invent3Pro/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // ...(hasSubdomain ? { 'X-Tenant-ID': subdomain } : {}),
              ...(tenantName ? { 'X-Tenant-ID': tenantName } : {}),
            },
            body: JSON.stringify(payload),
          }
        );

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.message);
        }

        if (res.ok && user) {
          return {
            ...user.data,
            username: credentials.username,
            // companySlug: hasSubdomain ? subdomain : null,
            companySlug: tenantName,
          };
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user && user.expiresIn) {
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
        token.role = user.role;
        token.companyId = user?.companyId;
        token.companySlug = user?.companySlug;
        token.roleIds = user.roleIds;
        token.roleSystemModuleContextPermissions =
          user.roleSystemModuleContextPermissions;
        token.hasShownGuide = false;
      }

      // Set accessTokenExpires if not already set, to prevent resetting it on each callback
      if (!token.accessTokenExpires) {
        token.accessTokenExpires = getTimeInSeconds() + user.expiresIn;
        token.exp = getTimeInSeconds() + user.expiresIn;
      }

      // Update token if triggered by 'update'
      if (trigger === 'update' && session?.user?.email) {
        return { ...token, ...session?.user };
      }

      // If token is still valid, return it
      if (
        token.accessTokenExpires &&
        getTimeInSeconds() <
          Number(token.accessTokenExpires) - TOKEN_REFRESH_BUFFER_SECONDS
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
          id: token.id.toString(),
          userId: token.id,
          companyId: token.companyId,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          username: token.username,
          sessionId: token.sessionId,
          apiKey: token.apiKey,
          accessToken: token.accessToken,
          accessTokenExpires: token.accessTokenExpires,
          role: token.role,
          companySlug: token?.companySlug,
          managedCompanySlug: token?.managedCompanySlug,
          managedCompanyiD: token?.managedCompanyId,
          roleIds: token.roleIds,
          roleSystemModuleContextPermissions:
            token.roleSystemModuleContextPermissions,
          hasShownGuide: token.hasShownGuide,
        },
        error: token.error,
      };
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1800,
  },
  jwt: {
    maxAge: 1800,
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(config);
