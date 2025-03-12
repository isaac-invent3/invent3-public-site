import type { Metadata } from 'next';
import UserForm from '~/lib/components/UserManagement/UserForm';

export const metadata: Metadata = {
  title: 'User Management - Add User',
};

const Page = () => {
  return <UserForm type="create" formCreationType="idp" />;
};

export default Page;
