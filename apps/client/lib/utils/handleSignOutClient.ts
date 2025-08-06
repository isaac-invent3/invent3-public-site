'use client';

import { signOut, getSession } from 'next-auth/react';

export async function handleSignOutClient(ref?: string) {
  const session = await getSession();

  const tenantName = session?.user?.companySlug
    ? `/${session.user.companySlug}`
    : '';

  const redirectUrl = ref
    ? `${tenantName}/signin?ref=${encodeURIComponent(ref)}`
    : `${tenantName}/signin`;

  // 🚀 Fire-and-forget logout API call
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: session?.user?.accessToken,
      apiKey: session?.user?.apiKey,
      sessionId: session?.user?.sessionId,
    }),
  }).catch((err) => {
    console.error('Logout API error (non-blocking):', err);
  });

  // 🚪 Immediately sign out and redirect
  await signOut({ redirect: false });
  window.location.href = redirectUrl;
}
