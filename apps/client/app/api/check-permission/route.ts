// app/api/check-permission/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getPathPermissionKey } from '~/lib/utils/roleAccess';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { path, accessToken, apiKey, companySlug, accessibleRoutes } = body;

    const basePath = path.split('/')?.[1];
    if (!basePath) {
      return NextResponse.json(
        { error: 'No base path found' },
        { status: 400 }
      );
    }

    const basePathPermissionKey = getPathPermissionKey(`/${basePath}`);
    const currentPathPermissionKey = getPathPermissionKey(path);

    if (!currentPathPermissionKey) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const routeInfo = Object.entries(accessibleRoutes).find(
      ([_, value]) => value === basePathPermissionKey
    );

    if (!routeInfo) {
      return NextResponse.json(
        { error: 'No permission for base path' },
        { status: 403 }
      );
    }

    const [key] = routeInfo;

    const response = await fetch(
      `${process.env.API_BASE_URL}/api/SystemSubModuleContextTypes/GetSystemSubModuleKeyValuesByParentModuleId/${key}?pageSize=50`,
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
      return NextResponse.json(
        { error: 'Failed to fetch permission data' },
        { status: 500 }
      );
    }

    const permissionData = await response.json();
    const permissionKeys = permissionData?.data?.items.map(
      (item: { keyName: string }) => item.keyName
    );

    const finalPermissionKeys = [basePathPermissionKey, ...permissionKeys];

    const hasPermission = finalPermissionKeys.includes(
      currentPathPermissionKey
    );

    return NextResponse.json({
      hasPermission,
      permissionKeys: finalPermissionKeys,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: String(error) },
      { status: 500 }
    );
  }
}
