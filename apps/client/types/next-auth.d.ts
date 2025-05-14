// types/next-auth.d.ts

/* eslint-disable no-unused-vars */

import 'next-auth';
import 'next-auth/jwt';

interface AccessibleRoute {
  [name: string]: string;
}

declare module 'next-auth' {
  interface User {
    userId: number;
    companyId: number;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    username: string | undefined;
    email: string | null | undefined;
    role: string[];
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    apiKey: string;
    expiresIn: number;
    sessionId: number;
    roleSystemModuleContextPermissions: AccessibleRoute;
    roleIds: number[];
    companySlug: string;
    managedCompanySlug: string | null;
    managedCompanyId: number | null;
    hasShownGuide: boolean;
  }
  interface Session {
    user: User;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role: string[];
    userId: number;
    companyId: number;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    username: string | undefined;
    email: string | null | undefined;
    role: string[];
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    apiKey: string;
    accessTokenExpires: number;
    sessionId: number;
    roleSystemModuleContextPermissions: AccessibleRoute;
    roleIds: number[];
    companySlug: string;
    managedCompanySlug: string | null;
    managedCompanyId: number | null;
    hasShownGuide: boolean;
  }
}

export type { AccessibleRoute };
