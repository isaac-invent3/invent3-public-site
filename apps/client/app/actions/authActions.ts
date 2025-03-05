'use server';

import { signIn, signOut, auth } from '~/auth';
import { AuthError } from 'next-auth';
import { ROUTES } from '~/lib/utils/constants';

export async function handleCredentialsSignin({
  username,
  password,
  callbackUrl,
}: {
  username: string;
  password: string;
  callbackUrl: string | null;
}) {
  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: callbackUrl ?? `/${ROUTES.DASHBOARD}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
          };
        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error;
  }
}

export async function handleSignOut(ref?: string) {
  const redirectUrl = ref ? `/signin?ref=${ref}` : '/';
  try {
    const session = await auth();
    if (!session) {
      return;
    }
    if (session.error) {
      await signOut({ redirectTo: redirectUrl });
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: session.user.accessToken,
        apiKey: session.user.apiKey,
        sessionId: session.user.sessionId,
      }),
    }).catch((error) => {
      console.error('Error sending logout request:', error);
    });

    console.log('Logout request sent.');
  } catch (error) {
    console.error('An error occurred during logout:', error);
  } finally {
    await signOut({ redirectTo: redirectUrl });
  }
}
