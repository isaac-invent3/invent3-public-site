'use client';

import { notFound } from 'next/navigation';

import AssetTransfer from '~/lib/components/AssetManagement/AssetTransfer';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useCheckAssetHasOngoingApprovalRequestQuery } from '~/lib/redux/services/approval-workflow/requests.services';
import { useGetAllApprovalWorkflowQuery } from '~/lib/redux/services/approval-workflow/settings.services';
import { useGetAssetInfoHeaderByIdQuery } from '~/lib/redux/services/asset/general.services';
import {
  APPROVAL_REQUEST_TYPES,
  DEFAULT_PAGE_SIZE,
} from '~/lib/utils/constants';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetAssetInfoHeaderByIdQuery(
    { id: params.id },
    { skip: params.id === undefined }
  );
  const { data: approvalData, isLoading: isChecking } =
    useCheckAssetHasOngoingApprovalRequestQuery(
      { assetIds: [params.id!], requestType: APPROVAL_REQUEST_TYPES.TRANSFER },
      { skip: params.id === undefined }
    );
  const { data: approvalWorkflow, isLoading: isLoadingApprovalWorkflow } =
    useGetAllApprovalWorkflowQuery({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  if (isLoading || isChecking || isLoadingApprovalWorkflow) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  return (
    <AssetTransfer
      data={data?.data}
      inAWorkflow={approvalData?.data ? approvalData?.data?.length > 0 : false}
      hasWorkflow={
        approvalWorkflow?.data
          ? approvalWorkflow?.data?.items.findIndex(
              (item) => item.approvalTypeId === APPROVAL_REQUEST_TYPES.TRANSFER
            ) !== -1
          : false
      }
    />
  );
}
