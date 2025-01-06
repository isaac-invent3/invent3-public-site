import type { Metadata } from 'next';

import Maintenance from '~/lib/components/Maintenance';

export const metadata: Metadata = {
  title: 'Maintenance',
};

export default function Page() {
  return <Maintenance activeTab={0} />;
}
