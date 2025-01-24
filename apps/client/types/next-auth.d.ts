// types/next-auth.d.ts

/* eslint-disable no-unused-vars */

import 'next-auth';
import 'next-auth/jwt';

export interface UserPermission {
  rowId: number;
  routeName: string;
  routePath: string;
  roleRouteId: number;
  roleRouteGuid: string;
  createPermission: boolean;
  readPermission: boolean;
  updatePermission: boolean;
  deletePermission: boolean;
  isDeleted: boolean;
  roleId: number;
  roleName: string;
  routeSetId: number;
  routeSetName: string;
}

declare module 'next-auth' {
  interface User {
    userId: number;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    username: string | undefined;
    email: string | null | undefined;
    role: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    apiKey: string;
    expiresIn: number;
    sessionId: number;
    roleRoutePermissions: UserPermission[];
  }
  interface Session {
    user: User;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role: string;
  }
}

export type { UserPermission };
