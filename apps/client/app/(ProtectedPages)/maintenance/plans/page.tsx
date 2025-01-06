import type { Metadata } from 'next';

import Maintenance from '~/lib/components/Maintenance';

export const metadata: Metadata = {
  title: 'Maintenance Plans',
};

export default function page() {
  return <Maintenance activeTab={0} />;
}
