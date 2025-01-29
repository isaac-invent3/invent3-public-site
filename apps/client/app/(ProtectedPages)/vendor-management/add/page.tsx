import type { Metadata } from 'next';
import VendorForm from '~/lib/components/VendorManagement/VendorForm';

export const metadata: Metadata = {
  title: 'Vendor Management - Add User',
};

const Page = () => {
  return <VendorForm type="create" />;
};

export default Page;
