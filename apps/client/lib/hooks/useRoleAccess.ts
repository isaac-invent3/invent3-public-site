import { useSession } from 'next-auth/react';
import { SubModuleKey } from '../interfaces/role.interfaces';
import Cookies from 'js-cookie';

const usePermissionAccess = (key: SubModuleKey): boolean => {
  const session = useSession();
  const permissionData = Cookies.get('permissionData');
  const permissions: string[] = permissionData
    ? JSON.parse(permissionData)
    : [];
  if (session.status === 'loading' || session.status === 'unauthenticated')
    return false;

  if (permissions.includes(key)) {
    return true;
  }

  return false;
};

export default usePermissionAccess;
