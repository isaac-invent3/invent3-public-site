'use client';

import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Custom hook for managing URL search parameters
 */
const useUpdateSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set(key, value?.toString());

    router.push(`?${params.toString()}`);
  };

  /**
   * Remove a search parameter
   * @param key The parameter key to remove
   */
  const removeSearchParam = (keys: string | string[]) => {
    const params = new URLSearchParams(searchParams?.toString());

    const keysToRemove = Array.isArray(keys) ? keys : [keys];
    keysToRemove.forEach((key) => params.delete(key));

    router.push(`?${params.toString()}`);
  };

  const getSearchParam = (key: string): string | null => {
    return searchParams?.get(key) || null;
  };

  return { updateSearchParam, removeSearchParam, getSearchParam };
};

export default useUpdateSearchParams;
