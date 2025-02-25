import type { Metadata } from 'next';
import CompanyDetails from '~/lib/components/CompanyManagement/CompanyDetails';

export const metadata: Metadata = {
  title: 'Company Management',
};

export default function Page({ params }: { params: { id: string } }) {
  return <CompanyDetails id={params.id} />;
}
