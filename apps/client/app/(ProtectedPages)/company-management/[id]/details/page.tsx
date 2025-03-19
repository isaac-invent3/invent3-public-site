'use client';
import { notFound } from 'next/navigation';
import CompanyDetails from '~/lib/components/CompanyManagement/CompanyDetails';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetCompanyByIdQuery } from '~/lib/redux/services/company.services';
import { setCompany } from '~/lib/redux/slices/CompanySlice';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetCompanyByIdQuery({ id: params.id! });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();
  const company = data?.data;
  dispatch(setCompany(company));

  return <CompanyDetails />;
}
