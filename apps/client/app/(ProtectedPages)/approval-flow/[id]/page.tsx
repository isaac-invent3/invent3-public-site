'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import ApprovalDetail from '~/lib/components/ApprovalWorkflow/ApprovalDetail';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetApprovalWorkflowRequestByIdQuery } from '~/lib/redux/services/approval-workflow/requests.services';
import { setApprovalRequest } from '~/lib/redux/slices/ApprovalSlice';

export default function Page({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetApprovalWorkflowRequestByIdQuery(
    { id: params.id },
    { skip: params.id === undefined }
  );

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }

  if (!data?.data) return notFound();

  dispatch(setApprovalRequest(data?.data));

  return <ApprovalDetail />;
}
