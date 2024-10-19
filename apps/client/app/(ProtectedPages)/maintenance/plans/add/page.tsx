import type { Metadata } from 'next';
import PlanForm from '~/lib/components/Maintenance/Plans/PlanForm';

export const metadata: Metadata = {
  title: 'Maintenance Plan',
};

export default function Page() {
  return <PlanForm type="create" />;
}
