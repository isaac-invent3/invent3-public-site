'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export interface FormattedUrl {
  pathnames: string[];
  searchParams: Record<string, string>;
}

/**
 * A custom hook to parse and format the current URL.
 *
 * This hook extracts and format the current URL into a structured object containing the pathname
 * segments and query parameters.
 *
 * @returns {FormattedUrl | null} An object containing `pathnames` and `searchParams` if the pathname exists, otherwise `null`.
 */
const useFormatUrl = (): FormattedUrl | null => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsedUrl = useMemo(() => {
    if (!pathname) return null;

    const pathnames = pathname.split('/').filter((segment) => segment);

    const searchParamsObject: Record<string, string> = {};

    if (searchParams) {
      searchParams.forEach((value, key) => {
        searchParamsObject[key] = value;
      });
    }

    return {
      pathnames,
      searchParams: searchParamsObject,
    };
  }, [pathname, searchParams]);

  return parsedUrl;
};

export default useFormatUrl;
