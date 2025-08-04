import { Box, Skeleton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AssetDetail from '~/lib/components/AssetManagement/AssetDetail';
import UserInfo from '~/lib/components/Common/UserInfo';
import UserDetail from '~/lib/components/UserManagement/UserDetail';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetABulkAssetActionQuery } from '~/lib/redux/services/asset/bulkAction.services';
import { useGetAssetDisposalQuery } from '~/lib/redux/services/asset/disposal.services';
import { useGetAssetTransferQuery } from '~/lib/redux/services/asset/transfer.services';
import {
  ASSET_BULK_ACTION_TYPE,
  SYSTEM_CONTEXT_DETAILS,
  SYSTEM_CONTEXT_TYPE,
} from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import BulkAssetModal from '../BulkAssetModal';

interface DetailInterface {
  totalAsset: number;
  assetId: number | null;
  assetBulkActionId: number | null;
  assetDisplayName: string | null;
  newOwner: null | string;
  newOwnerId: number | null;
  newLocation: null | string | number;
  date: null | string;
  reason: null | string;
}

const SectionTwo = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  const {
    isOpen: isOpenAsset,
    onClose: onCloseAsset,
    onOpen: onOpenAsset,
  } = useDisclosure();
  const {
    isOpen: isOpenUser,
    onClose: onCloseUser,
    onOpen: onOpenUser,
  } = useDisclosure();
  const {
    isOpen: isOpenBulkAsset,
    onClose: onCloseBulkAsset,
    onOpen: onOpenBulkAsset,
  } = useDisclosure();
  const { data: assetTransfer, isLoading: assetTransferLoading } =
    useGetAssetTransferQuery(
      { id: approvalRequest?.contextId! },
      {
        skip:
          approvalRequest?.systemContextTypeId !==
          SYSTEM_CONTEXT_TYPE.ASSET_TRANSFER,
      }
    );
  const { data: assetDisposal, isLoading: assetDisposalLoading } =
    useGetAssetDisposalQuery(
      { id: approvalRequest?.contextId! },
      {
        skip:
          approvalRequest?.systemContextTypeId !==
          SYSTEM_CONTEXT_TYPE.ASSET_DISPOSAL,
      }
    );
  const { data: assetBulkAction, isLoading: assetBulkActionLoading } =
    useGetABulkAssetActionQuery(
      { id: approvalRequest?.contextId! },
      {
        skip:
          approvalRequest?.systemContextTypeId !==
          SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION,
      }
    );
  const isLoading =
    assetDisposalLoading || assetTransferLoading || assetBulkActionLoading;

  const [details, setDetails] = useState<DetailInterface>({
    totalAsset: 0,
    assetBulkActionId: null,
    assetId: null,
    newOwnerId: null,
    assetDisplayName: '--',
    newOwner: null,
    newLocation: '--',
    date: '--',
    reason: '--',
  });

  useEffect(() => {
    if (assetDisposal?.data) {
      setDetails((prev) => ({
        ...prev,
        assetDisplayName: 'Asset',
        assetId: assetDisposal?.data?.assetId,
        reason: assetDisposal?.data?.comments,
        date: assetDisposal?.data?.disposalDate
          ? dateFormatter(assetDisposal?.data?.disposalDate, 'MMMM DD, YYYY')
          : null,
      }));
    }
  }, [assetDisposal]);

  useEffect(() => {
    if (assetTransfer?.data) {
      setDetails((prev) => ({
        ...prev,
        assetDisplayName: assetTransfer?.data?.assetName,
        assetId: assetTransfer?.data?.assetId,
        newOwner: assetTransfer?.data?.newOwner,
        newLocation: assetTransfer?.data?.transsferedToLocation,
        reason: assetTransfer?.data?.comments,
        date: assetTransfer?.data?.transferDate
          ? dateFormatter(assetTransfer?.data?.transferDate, 'MMMM DD, YYYY')
          : null,
      }));
    }
  }, [assetTransfer]);

  useEffect(() => {
    if (assetBulkAction?.data) {
      setDetails((prev) => ({
        ...prev,
        totalAsset: assetBulkAction?.data?.totalAssets || 0,
        assetBulkActionId: assetBulkAction?.data?.bulkActionId,
        newOwner: assetBulkAction?.data?.newOwner,
        newLocation: assetBulkAction?.data?.transsferedToLocation,
        date: assetBulkAction?.data?.actionDate
          ? dateFormatter(assetBulkAction?.data?.actionDate, 'MMMM DD, YYYY')
          : null,
        reason: assetBulkAction?.data?.comments,
      }));
    }
  }, [assetBulkAction]);

  return (
    <>
      <VStack alignItems="flex-start" gap="1.2em">
        <Box
          display="grid"
          gridTemplateColumns="90px 1fr"
          columnGap="2.5em"
          width="100%"
        >
          <Text color="neutral.600" size="md">
            {SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION ===
            approvalRequest?.systemContextTypeId
              ? 'Total Assets'
              : 'Asset'}
          </Text>
          <Skeleton isLoaded={!isLoading} minWidth="100px">
            {SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION ===
              approvalRequest?.systemContextTypeId && (
              <Text
                color="blue.500"
                size="md"
                cursor="pointer"
                onClick={() => {
                  if (details?.assetBulkActionId) {
                    onOpenBulkAsset();
                  }
                }}
              >
                {details?.totalAsset}
              </Text>
            )}
            {SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION !==
              approvalRequest?.systemContextTypeId && (
              <Text
                color="blue.500"
                size="md"
                cursor="pointer"
                onClick={() => {
                  if (details?.assetId) {
                    onOpenAsset();
                  }
                }}
              >
                {details?.assetDisplayName}
              </Text>
            )}
          </Skeleton>
        </Box>

        {(SYSTEM_CONTEXT_TYPE.ASSET_TRANSFER ===
          approvalRequest?.systemContextTypeId ||
          assetBulkAction?.data?.bulkActionTypeId ===
            ASSET_BULK_ACTION_TYPE.ASSET_TRANSFER) && (
          <Box
            display="grid"
            gridTemplateColumns="90px 1fr"
            columnGap="2.5em"
            width="100%"
          >
            <Text color="neutral.600" size="md">
              New Owner
            </Text>
            <Skeleton isLoaded={!isLoading} minWidth="100px">
              {details?.newOwner ? (
                <UserInfo
                  name={details?.newOwner}
                  textStyle={{
                    color: '#0366EF',
                    size: 'md',
                    cursor: 'pointer',
                    onClick: () => {
                      if (details?.newOwnerId) {
                        onOpenUser();
                      }
                    },
                  }}
                  customAvatarStyle={{
                    width: '24px',
                    height: '24px',
                  }}
                />
              ) : (
                '--'
              )}
            </Skeleton>
          </Box>
        )}

        {(SYSTEM_CONTEXT_TYPE.ASSET_TRANSFER ===
          approvalRequest?.systemContextTypeId ||
          assetBulkAction?.data?.bulkActionTypeId ===
            ASSET_BULK_ACTION_TYPE.ASSET_TRANSFER) && (
          <Box
            display="grid"
            gridTemplateColumns="90px 1fr"
            columnGap="2.5em"
            width="100%"
          >
            <Text color="neutral.600" size="md">
              New Location
            </Text>
            <Skeleton isLoaded={!isLoading} minWidth="100px">
              <Text color="neutral.800" size="md" isTruncated>
                {details?.newLocation}
              </Text>
            </Skeleton>
          </Box>
        )}

        <Box
          display="grid"
          gridTemplateColumns="90px 1fr"
          columnGap="2.5em"
          width="100%"
        >
          <Text color="neutral.600" size="md">
            {SYSTEM_CONTEXT_TYPE.ASSET_TRANSFER ===
              approvalRequest?.systemContextTypeId ||
            assetBulkAction?.data?.bulkActionTypeId ===
              ASSET_BULK_ACTION_TYPE.ASSET_TRANSFER
              ? 'Transfer'
              : 'Disposal'}{' '}
            Date
          </Text>
          <Skeleton isLoaded={!isLoading} minWidth="100px">
            <Text color="neutral.800" size="md">
              {details?.date}
            </Text>
          </Skeleton>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="90px 1fr"
          columnGap="2.5em"
          width="100%"
        >
          <Text color="neutral.600" size="md">
            Reason
          </Text>
          <Skeleton isLoaded={!isLoading} width="100%">
            <Text color="neutral.800" size="md" isTruncated>
              {details?.reason}
            </Text>
          </Skeleton>
        </Box>
      </VStack>
      <AssetDetail
        isOpen={isOpenAsset}
        onClose={() => {
          onCloseAsset();
        }}
        defaultAssetId={details?.assetId || undefined}
      />
      <UserDetail
        isOpen={isOpenUser}
        onClose={() => {
          onCloseUser();
        }}
        defaultUserId={details?.newOwnerId || undefined}
      />
      {details?.assetBulkActionId && (
        <BulkAssetModal
          isOpen={isOpenBulkAsset}
          onClose={() => {
            onCloseBulkAsset();
          }}
          bulkActionId={details?.assetBulkActionId}
        />
      )}
    </>
  );
};

export default SectionTwo;
