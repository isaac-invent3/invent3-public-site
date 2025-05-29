import { useSession } from 'next-auth/react';
import { SubModuleKey } from '../interfaces/role.interfaces';
import Cookies from 'js-cookie';
import { ROLE_IDS_ENUM } from '../utils/constants';

import { useMemo } from 'react';

const usePermissionAccess = (key: SubModuleKey): boolean => {
  const { data: session, status } = useSession();

  const permissions = useMemo(() => {
    const raw = Cookies.get('permissionData');
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  // if (status === 'loading' || status === 'unauthenticated') return false;

  if (
    permissions.includes(key) ||
    session?.user?.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) ||
    session?.user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY)
  ) {
    return true;
  }

  return false;
};

export default usePermissionAccess;
