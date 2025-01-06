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

  /**
   * Clear all search parameters after the specified parameter
   * @param key The parameter key after which all params should be cleared
   */

  interface ClearSearchParamsAfterOptions {
    removeSelf: boolean;
  }

  const clearSearchParamsAfter = (
    key: string,
    options?: Partial<ClearSearchParamsAfterOptions>
  ) => {
    const params = new URLSearchParams(searchParams?.toString());
    const keys = Array.from(params.keys());

    // Find the index of the specified key
    const keyIndex = keys.indexOf(key);

    if (keyIndex !== -1) {
      // Start clearing from the current key if removeSelf is true
      const startIndex = options?.removeSelf ? keyIndex : keyIndex + 1;

      // Remove all parameters starting from the determined index
      for (let i = startIndex; i < keys.length; i++) {
        const key = keys[i];
        if (key) {
          params.delete(key);
        }
      }

      router.push(`?${params.toString()}`);
    }
  };

  const getSearchParam = (key: string): string | null => {
    return searchParams?.get(key) || null;
  };

  return {
    updateSearchParam,
    removeSearchParam,
    getSearchParam,
    clearSearchParamsAfter,
  };
};

export default useUpdateSearchParams;
