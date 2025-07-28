import { useSession } from 'next-auth/react';
import { SubModuleKey } from '../interfaces/role.interfaces';
import Cookies from 'js-cookie';
import { ROLE_IDS_ENUM } from '../utils/constants';

import { useEffect, useState } from 'react';

const getPermissions = () => {
  const raw = Cookies.get('permissionData');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const usePermissionAccess = (key: SubModuleKey): boolean => {
  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<string[]>(getPermissions());

  useEffect(() => {
    const interval = setInterval(() => {
      setPermissions(getPermissions());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
