import { Metadata } from 'next';
import CompanyForm from '~/lib/components/CompanyManagement/CompanyForm';
import { COMPANY_TYPE_ENUM } from '~/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Company Management - Add Company',
};

export default function Page() {
  return (
    <CompanyForm
      type="create"
      companyType={COMPANY_TYPE_ENUM.MANAGE_DATA_FOR_COMPANIES}
    />
  );
}
