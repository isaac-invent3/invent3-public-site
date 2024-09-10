import type { Metadata } from 'next';
import AssetForm from '~/lib/components/AssetManagement/AssetForm';

export const metadata: Metadata = {
  title: 'Asset Management',
};

export default function Page() {
  return <AssetForm type="create" />;
}
