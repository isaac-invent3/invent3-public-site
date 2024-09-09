'use server';

import { signIn, signOut } from '~/auth';
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
  await signOut({ redirectTo: '/' });
}
