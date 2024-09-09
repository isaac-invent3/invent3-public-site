import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getSession, signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}`,
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      // Attach the access token to the Authorization header
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
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
  const session = await getSession();

  // If you get a 401 response, try refreshing the token
  if (result.error && result.error.status === 401) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: session?.user.accessToken,
        apiKey: session?.user.apiKey,
        sessionId: session?.user.sessionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        /* send log to the Sentry if the endpoint fails
          if (!data.success)
              notifySentry("Could not log out!")
           */
      })
      .catch((error) => {
        console.log(error);
        /* send log to the Sentry if an error occurs
          notifySentry(error)
           */
      })
      .finally(async () => {
        signOut({ redirect: true });
      });
  }

  return result;
};

export default baseQueryWithReauth;
