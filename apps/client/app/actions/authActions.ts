'use server';

import { signIn, signOut, auth } from '~/auth';
import { AuthError } from 'next-auth';

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
      redirectTo: callbackUrl ?? '/dashboard',
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

export async function handleSignOut() {
  try {
    const session = await auth();
    if (!session?.user?.accessToken) {
      throw new Error('No access token found in session');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: session.user.accessToken,
          apiKey: session.user.apiKey,
          sessionId: session.user.sessionId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // If the response isn't OK, log the error and notify Sentry
      console.error('Failed to log out', data);
      // Optionally notify Sentry here
      // notifySentry("Could not log out!")
      return;
    }

    console.log('Logout successful:', data);
  } catch (error) {
    console.error('An error occurred during logout:', error);
    // Optionally notify Sentry here
    // notifySentry(error)
  } finally {
    // Ensure the user is signed out and redirected, even if an error occurs
    await signOut({ redirectTo: '/' });
  }
}
