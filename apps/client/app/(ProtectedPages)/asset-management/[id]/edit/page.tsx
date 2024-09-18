'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import AssetForm from '~/lib/components/AssetManagement/AssetForm';
import { useGetAssetByIdQuery } from '~/lib/redux/services/asset/general.services';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetAssetByIdQuery(params.id);

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();

  return <AssetForm data={data?.data} type="edit" />;
}
