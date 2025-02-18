'use client';

import { useSearchParams } from 'next/navigation';
import CompanyForm from '~/lib/components/CompanyManagement/CompanyForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';

export default function Page() {
  const searchParams = useSearchParams();
  const companyIdString = searchParams.get(SYSTEM_CONTEXT_DETAILS.COMPANY.slug);
  const companyId = companyIdString ? Number(companyIdString) : undefined;

  const dispatch = useAppDispatch();

  return <CompanyForm type="create" />;
}
