import {
  HStack,
  Icon,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import { useEffect, useState } from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import PlanDetailsModal from '~/lib/components/Maintenance/Plans/Drawers/PlanDetailDrawer';
import MaintenancePlanTable from '~/lib/components/Maintenance/Plans/PlanTable';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllMaintenancePlansByGroupContextIdAndGroupTypeIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { ASSET_GROUP_TYPE } from '~/lib/utils/constants';

interface PopoverProps {
  data: MaintenancePlan;
}

const Popover = (props: PopoverProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    maintenancePlans: selectedMaintenancePlans,
    newMaintenancePlanIds,
    deletedMaintenancePlanIds,
  } = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const isInNewPlanArray = newMaintenancePlanIds.includes(
    data.maintenancePlanId
  );

  const handleDeletePlan = () => {
    // Filter out the maintenance plan to be deleted
    const updatedMaintenancePlans = selectedMaintenancePlans.filter(
      (plan) => plan.maintenancePlanId !== data.maintenancePlanId
    );

    const updatedDeletedPlans = isInNewPlanArray
      ? deletedMaintenancePlanIds
      : [...deletedMaintenancePlanIds, data.maintenancePlanId];

    // Dispatch the updated state
    dispatch(
      updateAssetForm({
        maintenancePlans: updatedMaintenancePlans,
        newMaintenancePlanIds: newMaintenancePlanIds.filter(
          (item) => item != data.maintenancePlanId
        ),
        deletedMaintenancePlanIds: updatedDeletedPlans,
      })
    );
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpen} color="black">
            View
          </Text>
          {data.planTypeName === 'Custom' && (
            <Text cursor="pointer" onClick={handleDeletePlan} color="#F50000">
              Delete
            </Text>
          )}
        </VStack>
      </GenericPopover>
      {isOpen && (
        <PlanDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          viewOnly
        />
      )}
    </>
  );
};

interface PlanListProps {
  viewOnly?: boolean;
  showEmptyState?: boolean;
}
const PlanList = (props: PlanListProps) => {
  const { viewOnly = false, showEmptyState = false } = props;
  const assetForm = useAppSelector((state) => state.asset.assetForm);
  const [assetTypePlans, setAssetTypePlans] = useState<MaintenancePlan[]>([]);
  const {
    data: assetTypeMaintenancePlan,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetAllMaintenancePlansByGroupContextIdAndGroupTypeIdQuery(
    {
      groupContextId: assetForm.assetTypeId!,
      groupTypeId: ASSET_GROUP_TYPE.ASSET_TYPE,
    },
    { skip: !assetForm.assetTypeId }
  );

  useEffect(() => {
    if (isSuccess && assetTypeMaintenancePlan) {
      setAssetTypePlans([assetTypeMaintenancePlan?.data]);
    }
    if (isError) {
      setAssetTypePlans([]);
    }
  }, [isError, isSuccess]);

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <HStack spacing="10px" alignItems="flex-start" width="full">
        {!viewOnly &&
          assetTypePlans.length > 0 &&
          !isLoading &&
          !isFetching && (
            <Tooltip
              label="Default Plans are automatically added to an asset based on the selected asset type"
              placement="top"
              bgColor="#CADBF2"
              color="blue.500"
              width="181px"
              rounded="4px"
              py="8px"
              px="16px"
              fontSize="12px"
            >
              <HStack
                width="32px"
                height="32px"
                rounded="8px"
                justifyContent="center"
                flexShrink={0}
                bgColor="#0366EF0D"
                mt="55px"
              >
                <Icon as={InfoIcon} boxSize="16px" color="blue.500" />
              </HStack>
            </Tooltip>
          )}
        <MaintenancePlanTable
          data={[...assetTypePlans, ...assetForm.maintenancePlans]}
          showFooter={false}
          emptyLines={3}
          isLoading={isLoading || isFetching}
          isSelectable={false}
          isFetching={isFetching}
          showEmptyState={showEmptyState}
          disabledRows={assetTypePlans.map((_, index) => index)}
          PopoverComponent={(data) => (viewOnly ? <></> : Popover({ data }))}
        />
      </HStack>
    </VStack>
  );
};

export default PlanList;
