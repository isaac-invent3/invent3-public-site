import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getSession } from 'next-auth/react';
import { env } from 'next-runtime-env';
import { handleSignOutClient } from '../utils/handleSignOutClient';

// const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const baseURL = env('NEXT_PUBLIC_API_URL');

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api`,
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.error) {
      return handleSignOutClient(window.location.pathname);
    }

    if (session?.user) {
      // Attach the access token to the Authorization header
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
      headers.set('ApiKey', `${session.user.apiKey}`);
      if (!headers.has('X-Tenant-ID')) {
        if (session?.user?.companySlug || session?.user?.managedCompanySlug) {
          headers.set(
            'X-Tenant-ID',
            `${session.user.managedCompanySlug ?? session.user.companySlug}`
          );
        }
      }
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // First attempt to execute the query
  let result = await baseQuery(args, api, extraOptions);
  // const path = typeof args === 'string' ? args : args.url;
  // If you get a 401 response, try refreshing the token
  if (result.error && result.error.status === 401) {
    handleSignOutClient(window.location.pathname);
  }

  return result;
};

export default baseQueryWithReauth;
