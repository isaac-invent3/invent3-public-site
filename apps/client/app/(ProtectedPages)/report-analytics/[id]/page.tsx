import type { Metadata } from 'next';
import ReportView from '~/lib/components/ReportAnalytics/ReportView';

export const metadata: Metadata = {
  title: 'Report and Analytics',
};

export default function Page({ params }: { params: { id: string } }) {
  return <ReportView id={params.id} />;
}
