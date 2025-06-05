import type { Metadata } from 'next';
import LocationForm from '~/lib/components/FacilityManagement/LocationForm';

export const metadata: Metadata = {
  title: 'Facility Management - Add Facility',
};

const Page = () => {
  return <LocationForm type="create" />;
};

export default Page;
