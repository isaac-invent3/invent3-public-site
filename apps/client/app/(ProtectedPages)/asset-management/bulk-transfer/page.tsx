'use client';

import BulkTransfer from '~/lib/components/AssetManagement/AssetTransfer/BulkTransfer';
import { getSelectedAssetIds } from '~/lib/components/AssetManagement/Common/utils';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useCheckAssetHasOngoingApprovalRequestQuery } from '~/lib/redux/services/approval-workflow/requests.services';
import { useGetAllApprovalWorkflowQuery } from '~/lib/redux/services/approval-workflow/settings.services';
import {
  APPROVAL_REQUEST_TYPES,
  DEFAULT_PAGE_SIZE,
} from '~/lib/utils/constants';

export default function Page() {
  const { data: approvalData, isLoading: isChecking } =
    useCheckAssetHasOngoingApprovalRequestQuery({
      assetIds: getSelectedAssetIds(),
      requestType: APPROVAL_REQUEST_TYPES.TRANSFER,
    });
  const { data: approvalWorkflow, isLoading: isLoadingApprovalWorkflow } =
    useGetAllApprovalWorkflowQuery({
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });

  if (isChecking || isLoadingApprovalWorkflow) {
    return <PageLoadingSkeleton />;
  }

  return (
    <BulkTransfer
      assetsInWorkFlow={approvalData?.data ?? []}
      hasWorkflow={
        approvalWorkflow?.data
          ? approvalWorkflow?.data?.items.findIndex(
              (item) =>
                item.approvalTypeId === APPROVAL_REQUEST_TYPES.BULK_TRANSFER
            ) !== -1
          : false
      }
    />
  );
}
