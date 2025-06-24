import { Box, Skeleton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AssetDetail from '~/lib/components/AssetManagement/AssetDetail';
import UserInfo from '~/lib/components/Common/UserInfo';
import UserDetail from '~/lib/components/UserManagement/UserDetail';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetDisposalQuery } from '~/lib/redux/services/asset/disposal.services';
import { useGetAssetTransferQuery } from '~/lib/redux/services/asset/transfer.services';
import {
  SYSTEM_CONTEXT_DETAILS,
  SYSTEM_CONTEXT_TYPE,
} from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

interface DetailInterface {
  totalAsset: number;
  assetId: number | null;
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
  const { updateSearchParam, removeSearchParam } = useCustomSearchParams();
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
  const isLoading = assetDisposalLoading || assetTransferLoading;

  const [details, setDetails] = useState<DetailInterface>({
    totalAsset: 0,
    assetId: null,
    newOwnerId: null,
    assetDisplayName: null,
    newOwner: null,
    newLocation: '--',
    date: '--',
    reason: null,
  });

  useEffect(() => {
    if (assetDisposal?.data) {
      setDetails((prev) => ({
        ...prev,
        assetDisplayName: 'Test',
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
        assetDisplayName: 'Test',
        assetId: assetTransfer?.data?.assetId,
        newOwner: assetTransfer?.data?.newOwnerId.toString(),
        newLocation: assetTransfer?.data?.transferredTo,
        date: assetTransfer?.data?.transferDate
          ? dateFormatter(assetTransfer?.data?.transferDate, 'MMMM DD, YYYY')
          : null,
      }));
    }
  }, [assetTransfer]);

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
            <Text
              color="blue.500"
              size="md"
              cursor="pointer"
              onClick={() => {
                if (details?.assetId) {
                  updateSearchParam(
                    SYSTEM_CONTEXT_DETAILS.ASSETS.slug,
                    details?.assetId
                  );
                  onOpenAsset();
                }
              }}
            >
              {SYSTEM_CONTEXT_TYPE.ASSET_BULK_ACTION ===
              approvalRequest?.systemContextTypeId
                ? details?.totalAsset
                : details?.assetDisplayName}
            </Text>
          </Skeleton>
        </Box>

        {SYSTEM_CONTEXT_TYPE.ASSET_DISPOSAL !==
          approvalRequest?.systemContextTypeId && (
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
                        updateSearchParam(
                          SYSTEM_CONTEXT_DETAILS.USER.slug,
                          details?.newOwnerId
                        );
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

        {SYSTEM_CONTEXT_TYPE.ASSET_DISPOSAL !==
          approvalRequest?.systemContextTypeId && (
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
            approvalRequest?.systemContextTypeId
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
      </VStack>
      <AssetDetail
        isOpen={isOpenAsset}
        onClose={() => {
          removeSearchParam(SYSTEM_CONTEXT_DETAILS.ASSETS.slug);
          onCloseAsset();
        }}
      />
      <UserDetail
        isOpen={isOpenUser}
        onClose={() => {
          removeSearchParam(SYSTEM_CONTEXT_DETAILS.USER.slug);
          onCloseUser();
        }}
      />
    </>
  );
};

export default SectionTwo;
