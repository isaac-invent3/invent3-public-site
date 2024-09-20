'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import AssetForm from '~/lib/components/AssetManagement/AssetForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetAssetByIdQuery } from '~/lib/redux/services/asset/general.services';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetAssetByIdQuery(params.id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" mt="80px" />;
  }
  if (!data?.data) return notFound();
  if (data?.data) {
    dispatch(updateAssetForm({ assetName: 'test' }));
  }

  return <AssetForm type="edit" />;
}
