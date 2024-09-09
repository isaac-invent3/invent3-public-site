// types/next-auth.d.ts

/* eslint-disable no-unused-vars */

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    role: string;
    accessToken: string;
    refreshToken: string;
    apiKey: string;
    accessTokenExpires: number;
    sessionId: number;
  }
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
