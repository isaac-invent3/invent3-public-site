import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getSession } from 'next-auth/react';
import { handleSignOut } from '~/app/actions/authActions';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}`,
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      // Attach the access token to the Authorization header
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
      headers.set('ApiKey', `${session.user.apiKey}`);
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
    handleSignOut();
  }

  return result;
};

export default baseQueryWithReauth;
