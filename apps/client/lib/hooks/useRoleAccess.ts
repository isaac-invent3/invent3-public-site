import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
const defaultPermission = {
  create: false,
  read: false,
  update: false,
  delete: false,
};

const usePermissionAccess = ({
  page,
  role,
}: {
  page?: string;
  role?: string | null;
}): Permission => {
  const session = useSession();
  const pathname = usePathname();

  if (session.status === 'loading' || session.status === 'unauthenticated')
    return defaultPermission;

  if (!role) {
    role = session.data && session.data.user.role;
  }

  if (!page) page = pathname;

  //Get permission from user based on the role and the page and return

  return { create: true, read: true, update: true, delete: true };
};

export default usePermissionAccess;
