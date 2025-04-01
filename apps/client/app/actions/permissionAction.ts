'use server';

import { auth } from '~/auth';
import { getPathPermissionKey } from '~/lib/utils/roleAccess';

export async function checkPermission({
  path,
}: {
  path: string;
}): Promise<{ permissionKeys: string[] } | undefined> {
  try {
    const session = await auth();

    if (!session) {
      console.warn('No active session found.');
      return;
    }

    const {
      roleSystemModuleContextPermissions: accessibleRoutes,
      accessToken,
      apiKey,
      companySlug,
    } = session.user;

    if (!accessibleRoutes) {
      console.warn('No accessible routes found for the user.');
      return;
    }

    // eg asset-management, task-managment
    const basePath = path.split('/')?.[1];
    if (!basePath) {
      console.warn('No Base Path');
      return;
    }

    const basePathPermissionKey = getPathPermissionKey(`/${basePath}`);

    const currentPathPermissionKey = getPathPermissionKey(path);

    if (!currentPathPermissionKey) {
      console.warn(`No permission key found for path: ${path}`);
      return;
    }
    const routeInfo = Object.entries(accessibleRoutes).find(
      // eslint-disable-next-line no-unused-vars
      ([_, value]) => value === basePathPermissionKey
    );

    if (!routeInfo) {
      console.warn(
        `Base Path Permission key not found in accessible routes: ${currentPathPermissionKey}`
      );
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const [key] = routeInfo;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/SystemSubModuleContextTypes/GetSystemSubModuleKeyValuesByParentModuleId/${key}?pageSize=50`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          ApiKey: apiKey,
          ...(companySlug ? { 'X-Tenant-ID': companySlug } : {}),
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch module routes: ${response.status} ${response.statusText}`
      );
      return;
    }
    const permissionData = await response.json();
    const permissionKeys = permissionData?.data?.items.map(
      (item: { keyName: string }) => item.keyName
    );
    const finalPermissionKeys = [basePathPermissionKey, ...permissionKeys];

    if (!finalPermissionKeys.includes(currentPathPermissionKey)) {
      `Failed to fetch module routes: ${response.status} ${response.statusText}`;
      return;
    }

    return { permissionKeys: finalPermissionKeys };
  } catch (error) {
    console.error('Error confirming permission:', error);
  }
}
