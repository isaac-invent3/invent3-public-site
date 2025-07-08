/* eslint-disable no-unused-vars */
import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { AssetBasedCompliance } from '~/lib/interfaces/asset/compliance.interfaces';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import MarkComplianceStatusDrawer from '../../../Drawers/MarkComplianceStatusDrawer';
import { useAppDispatch } from '~/lib/redux/hooks';
import AssetComplianceHistoryDrawer from '../../../Drawers/AssetComplianceHistoryDrawer';

const PopoverAction = ({ data }: { data: AssetBasedCompliance }) => {
  const { updateSearchParam } = useCustomSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenComplianceHistory,
    onOpen: onOpenComplianceHistory,
    onClose: onCloseComplianceHistory,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  return (
    <>
      <GenericPopover width="160px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text
            cursor="pointer"
            onClick={() =>
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.COMPLIANCE.slug,
                data.assetId
              )
            }
          >
            View Compliance
          </Text>
          <Text cursor="pointer" onClick={onOpenComplianceHistory}>
            View Compliance History
          </Text>
          <Text
            cursor="pointer"
            onClick={() => {
              onOpen();
            }}
          >
            Mark Compliance Status
          </Text>
        </VStack>
      </GenericPopover>
      <MarkComplianceStatusDrawer
        isOpen={isOpen}
        onClose={onClose}
        assetIds={[data.assetId]}
      />
      {isOpenComplianceHistory && (
        <AssetComplianceHistoryDrawer
          isOpen={isOpenComplianceHistory}
          onClose={onCloseComplianceHistory}
          data={{ assetId: data.assetId, assetName: data.assetName }}
        />
      )}
    </>
  );
};

export default PopoverAction;
