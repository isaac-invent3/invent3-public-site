import type { Metadata } from 'next';
import UserGroupForm from '~/lib/components/RoleManagement/UserGroup/UserGroupForm';

export const metadata: Metadata = {
  title: 'Role Management - Add User Group',
};

const Page = () => {
  return <UserGroupForm type="create" />;
};

export default Page;
