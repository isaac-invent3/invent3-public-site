'use server';

import { auth } from '~/auth';

export async function checkPermission({
  // eslint-disable-next-line no-unused-vars
  permissionKey,
}: {
  permissionKey: string;
}) {
  try {
    const session = await auth();
    if (!session) {
      return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Aisles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`,
        ApiKey: session.user.apiKey,
      },
    });

    return response.json();
  } catch (error) {
    console.error('Error confirming permission', error);
  }
}
