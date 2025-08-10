'use server';

import { signIn } from '~/auth';
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
