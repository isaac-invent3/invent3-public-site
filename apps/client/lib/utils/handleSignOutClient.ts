'use client';

import { signOut, getSession } from 'next-auth/react';
import { disableBeforeUnload } from '../components/UI/FormLeaveDialogProvider';

let isSigningOut = false;

export async function handleSignOutClient(ref?: string) {
  // Prevent multiple triggers
  if (isSigningOut) return;
  isSigningOut = true;

  // Disable the leave-site dialog before redirect
  disableBeforeUnload();

  // Get session before signOut wipes it
  const session = await getSession();

  const companySlug = session?.user?.companySlug || '';
  const tenantName = companySlug ? `/${companySlug}` : '';
  const accessToken = session?.user?.accessToken || '';
  const apiKey = session?.user?.apiKey || '';
  const sessionId = session?.user?.sessionId || '';

  // If ref starts with tenantName, strip it
  let cleanRef = ref || '';
  if (tenantName && cleanRef.startsWith(tenantName)) {
    cleanRef = cleanRef.slice(tenantName.length) || '/';
  }

  // Build redirect URL now (before session clears)
  const redirectUrl = cleanRef
    ? `${tenantName}/signin?ref=${encodeURIComponent(cleanRef)}`
    : `${tenantName}/signin`;

  // Fire-and-forget logout API
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken,
      apiKey,
      sessionId,
      tenantName: companySlug,
    }),
  }).catch((err) => {
    console.error('Logout API error (non-blocking):', err);
  });

  // Sign out locally without redirect
  await signOut({ redirect: false });

  // Force redirect manually
  window.location.href = redirectUrl;
}
