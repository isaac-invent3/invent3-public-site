'use client';

import { SYSTEM_CONTEXT_DETAILS } from '../utils/constants';
import { FormattedUrl } from './useFormatUrl';

interface ParseUrlDataResponse {
  systemContextId: number;
  contextId: number | string | null;
}

type SystemContextDetail =
  (typeof SYSTEM_CONTEXT_DETAILS)[keyof typeof SYSTEM_CONTEXT_DETAILS];

/**
 * Custom hook to parse URL data and extract relevant context information.
 *
 * This hook processes the provided `FormattedUrl` object to determine the system context
 * and context ID based on the URL's pathname segments or search parameters. It uses
 * the `SYSTEM_CONTEXT_DETAILS` constant to map routes and slugs to system contexts.
 *
 * @param {FormattedUrl | null} formattedUrl - The formatted URL object containing `pathnames` and `searchParams`.
 * @returns {ParseUrlDataResponse | null} An object containing the `systemContextId` and `contextId` if a match is found, otherwise `null`.
 */
const useParseUrlData = (
  formattedUrl: FormattedUrl | null
): ParseUrlDataResponse | null => {
  if (!formattedUrl) return null;

  const { pathnames, searchParams } = formattedUrl;

  /**
   * Retrieves the system context detail based on the route or slug.
   *
   * @param {string} route - The route or slug to look up in the system context details.
   * @param {'route' | 'slug'} type - The type of lookup to perform, either `route` or `slug`.
   * @returns {SystemContextDetail | null} The matching system context detail, or `null` if not found.
   */
  const getSystemContextDetail = (
    route: string,
    type: 'route' | 'slug'
  ): SystemContextDetail | null => {
    for (const key of Object.keys(SYSTEM_CONTEXT_DETAILS) as Array<
      keyof typeof SYSTEM_CONTEXT_DETAILS
    >) {
      if (SYSTEM_CONTEXT_DETAILS[key][type] === route) {
        return SYSTEM_CONTEXT_DETAILS[key];
      }
    }

    return null;
  };

  const searchParamKeys = Object.keys(searchParams);

  for (let i = searchParamKeys.length - 1; i >= 0; i--) {
    const key = searchParamKeys[i];

    if (!key || !searchParams[key]) continue;

    const systemContextDetail = getSystemContextDetail(key, 'slug');

    if (systemContextDetail) {
      return {
        systemContextId: systemContextDetail.id,
        contextId: searchParams[key],
      };
    }
  }

  for (let i = pathnames.length - 1; i >= 0; i--) {
    const segment = pathnames[i];

    if (!segment) continue;

    const systemContextDetail = getSystemContextDetail(segment, 'route');

    if (systemContextDetail) {
      if (systemContextDetail.route === 'maintenance') {
        switch (searchParams['tab']) {
          case 'Schedules':
            return {
              systemContextId: SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULES.id,
              contextId: null,
            };
          default:
            return {
              systemContextId: SYSTEM_CONTEXT_DETAILS.MAINTENANCE_PLANS.id,
              contextId: null,
            };
        }
      }
      return {
        systemContextId: systemContextDetail.id,
        contextId: null,
      };
    }
  }

  return null;
};

export default useParseUrlData;
