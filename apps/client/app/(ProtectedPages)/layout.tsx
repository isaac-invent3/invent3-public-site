'use client';
import Chat from '~/lib/components/Notification/Tabs/test';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import Layout from '~/lib/layout/ProtectedPage';
import { useAppDispatch } from '~/lib/redux/hooks';
import { moduleApi } from '~/lib/redux/services/modules.services';
import Cookies from 'js-cookie';

type RootLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: RootLayoutProps) => {
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const dispatch = useAppDispatch();

  const fetchRelatedPermissionKeyForASystemContext = async (
    relatedKeys: string[] | undefined
  ) => {
    const session = await getSession();
    const accessibleRoutes = session?.user?.roleSystemModuleContextPermissions;
    const permissionData = Cookies.get('permissionData');

    let permissionKeys: string[] = permissionData
      ? JSON.parse(permissionData)
      : [];

    if (!relatedKeys || !accessibleRoutes) return;

    for (const relatedKey of relatedKeys) {
      const routeInfo = Object.entries(accessibleRoutes).find(
        ([, value]) => value === relatedKey
      );

      if (!routeInfo) continue; // Skip if no match found

      const [key] = routeInfo;

      try {
        const result = await dispatch(
          moduleApi.endpoints.getAllSubModulesKeyByModuleId.initiate({
            moduleId: +key,
            pageSize: 50,
          })
        );

        if (result.data?.data?.items?.length) {
          const newKeys = result.data.data.items.map((item) => item.keyName);
          permissionKeys.push(...newKeys);
        }
      } catch (error) {
        console.error('Error fetching submodules:', error);
      }
    }

    Cookies.set('permissionData', JSON.stringify(permissionKeys));
  };

  useEffect(() => {
    fetchRelatedPermissionKeyForASystemContext(data?.permissionKeys);
  }, [data]);

  return (
    <Layout>
      <Chat />

      {children}
    </Layout>
  );
};

export default ProtectedLayout;
