'use server';

import { signIn, signOut, auth } from '~/auth';
import { AuthError } from 'next-auth';
import { ROUTES } from '~/lib/utils/constants';
import { redirect } from 'next/navigation';

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
  const session = await auth();

  const tenantName = session?.user?.companySlug
    ? `/${session.user.companySlug}`
    : '';
  const redirectUrl = ref
    ? `${tenantName}/signin?ref=${encodeURIComponent(ref)}`
    : `${tenantName}/signin`;

  // If no session or has error, just redirect
  if (!session || session.error) {
    await signOut();
    redirect(redirectUrl);
  }

  try {
    // Optional: Call backend logout to invalidate session/token
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
    });
  } catch (error) {
    console.error('Logout API error:', error);
  }

  await signOut();
  redirect(redirectUrl); // Redirect manually from server action
}
