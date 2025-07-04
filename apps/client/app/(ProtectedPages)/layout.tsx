'use client';
import Cookies from 'js-cookie';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import useFCMToken from '~/lib/hooks/useFCMToken';
import Layout from '~/lib/layout/ProtectedPage';
import { useAppDispatch } from '~/lib/redux/hooks';
import { moduleApi } from '~/lib/redux/services/modules.services';
import { onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase-config';

type RootLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: RootLayoutProps) => {
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const dispatch = useAppDispatch();
  const { fcmToken, notificationPermissionStatus } = useFCMToken();

  useEffect(() => {
    if (
      messaging &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground push notification received:', payload);
        // Handle foreground notifications (e.g., show a toast)
      });
      return () => unsubscribe();
    }
  }, []);

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

    // Checks if user have access to the route
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
          // Add only unique keys
          permissionKeys = Array.from(new Set([...permissionKeys, ...newKeys]));
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

  return <Layout>{children}</Layout>;
};

export default ProtectedLayout;
