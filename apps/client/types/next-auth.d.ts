// types/next-auth.d.ts

/* eslint-disable no-unused-vars */

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    userId: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    role: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    apiKey: string;
    role: string;
    expiresIn: number;
    sessionId: number;
  }
  interface Session {
    user: User;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
