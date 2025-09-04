import type { Metadata } from 'next';
import FacilityInfoStep from '~/lib/components/FacilityManagement/LocationForm/FacilityInfoStep';

export const metadata: Metadata = {
  title: 'Facility Management - Add Facility',
};

const Page = () => {
  return <FacilityInfoStep />;
};

export default Page;
