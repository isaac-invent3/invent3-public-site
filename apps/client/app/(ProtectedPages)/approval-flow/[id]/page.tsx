'use client';

import { Skeleton } from '@chakra-ui/react';
import ApprovalDetail from '~/lib/components/ApprovalWorkflow/ApprovalDetail';

import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';

export default function Page({ params }: { params: { id: number } }) {
  // Get the Approval Workflow

  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: params.id },
    { skip: params.id === undefined }
  );

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }

  return <ApprovalDetail data={data?.data as any} />;
}
