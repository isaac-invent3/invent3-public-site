import type { Metadata } from 'next';
import ScheduleForm from '~/lib/components/Maintenance/Schedules/ScheduleForm';

export const metadata: Metadata = {
  title: 'Maintenance Schedule',
};

export default function Page() {
  return <ScheduleForm type="create" />;
}
