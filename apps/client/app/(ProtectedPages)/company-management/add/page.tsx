'use client';

import { Metadata } from 'next';
import CompanyForm from '~/lib/components/CompanyManagement/CompanyForm';

export const metadata: Metadata = {
  title: 'Company Management - Add Company',
};

export default function Page() {
  return <CompanyForm type="create" />;
}
