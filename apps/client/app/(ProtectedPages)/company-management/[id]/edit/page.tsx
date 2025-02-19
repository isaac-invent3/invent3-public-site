'use client';

import { notFound } from 'next/navigation';
import CompanyForm from '~/lib/components/CompanyManagement/CompanyForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetCompanyByIdQuery } from '~/lib/redux/services/company.services';
import { setCompanyForm } from '~/lib/redux/slices/CompanySlice';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetCompanyByIdQuery({ id: params.id! });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const company = data?.data;
    dispatch(
      setCompanyForm({
        companyLogo: null,
        companyName: company.companyName,
        registrationNumber: company.registrationNumber,
        industryTypeId: company.industryId,
        industryTypeName: company.industryName,
        companyEmail: company.emailAddress,
        companyWebsite: company.webUrl,
        address1: company.address,
        address2: null,
        lgaId: null,
        stateId: null,
        countryId: null,
        lgaName: null,
        stateName: null,
        countryName: null,
        postalCode: null,
        contactFirstName: company.contactPersonFirstName,
        contactLastName: company.contactPersonLastName,
        contactEmail: company.contactPersonEmail,
        contactPhoneNumber: company.phoneNumber,
        subscriptionPlan: null,
        startDate: null,
        endDate: null,
      })
    );
  }

  return <CompanyForm type="edit" />;
}
