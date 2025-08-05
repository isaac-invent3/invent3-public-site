'use client';

import { notFound } from 'next/navigation';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import VendorForm from '~/lib/components/VendorManagement/VendorForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetVendorByIdQuery } from '~/lib/redux/services/vendor.services';
import { setVendorForm } from '~/lib/redux/slices/VendorSlice';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetVendorByIdQuery({ vendorId: params.id! });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const vendor = data?.data;
    dispatch(
      setVendorForm({
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        logo: null,
        description: null,
        vendorCategoryId: null,
        vendorCategoryName: null,
        address1: null,
        address2: null,
        vendorCountryId: null,
        vendorStateId: null,
        vendorCityId: null,
        vendorCityName: null,
        vendorCountryName: null,
        vendorStateName: null,
        postalCode: null,
        contactFirstName: null,
        contactLastName: null,
        primaryEmail: null,
        primaryPhoneNumber: null,
        contractStartDate: null,
        contractEndDate: null,
        contractValue: null,
        vendorStatusId: null,
        vendorStatusName: null,
        vendorDocuments: [],
        initialDocumentIds: [],
      })
    );
  }

  return <VendorForm type="edit" />;
}
