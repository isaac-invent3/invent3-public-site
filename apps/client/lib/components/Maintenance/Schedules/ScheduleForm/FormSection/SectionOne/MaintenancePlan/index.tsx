/* eslint-disable no-unused-vars */
import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import CustomizedPlanModal from '~/lib/components/Maintenance/Plans/Drawers/CustomizedplanDrawer';
import PlanDetailsModal from '~/lib/components/Maintenance/Plans/Drawers/PlanDetailDrawer';
import InfoCard from '~/lib/components/UI/InfoCard';
import { ErrorMessage, FormSectionInfo } from '@repo/ui/components';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllMaintenancePlansByAssetIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import MaintenancePlanTable from '~/lib/components/Maintenance/Plans/PlanTable';

const View = (info: MaintenancePlan) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Text
        color="#0366EF"
        textDecoration="underline"
        cursor="pointer"
        onClick={() => onOpen()}
      >
        View
      </Text>
      {isOpen && (
        <PlanDetailsModal isOpen={isOpen} onClose={onClose} data={info} />
      )}
    </>
  );
};
const Plan = () => {
  const { assetId, assetTypeId, assetName } = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAllMaintenancePlansByAssetIdQuery(
      {
        id: assetId!,
        assetTypeId: assetTypeId!,
        pageSize,
        pageNumber,
      },
      { skip: !assetId || !assetTypeId }
    );
  const [selectedPlan, setSelectedPlan] = useState<MaintenancePlan | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showCustomizedButton, setShowCustomizedButton] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('planId');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.data) {
      setSelectedRows([]);
      const items: MaintenancePlan[] = data?.data?.items;
      const customizedPlan = items.find(
        (item) => item.planTypeName === 'Custom'
      );
      if (customizedPlan) {
        const customizedIndex = items.findIndex(
          (value) =>
            value.maintenancePlanId === customizedPlan.maintenancePlanId
        );
        setShowCustomizedButton(false);
        setSelectedRows([customizedIndex]);
      } else {
        setShowCustomizedButton(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedRows.length >= 1) {
      const items = data?.data?.items;
      const customizedPlan =
        items && items.find((value, index) => index === selectedRows[0]);
      if (customizedPlan) {
        helpers.setValue(customizedPlan.maintenancePlanId);
        dispatch(
          updateScheduleForm({
            maintenancePlanInfo: {
              planName: customizedPlan.planName,
              planType: customizedPlan.planTypeName,
              planStatus: customizedPlan.planStatusName,
              assetName,
              assetTypeName: null,
              startDate: customizedPlan.startDate,
              endDate: customizedPlan.endDate,
            },
          })
        );
      }
    } else {
      helpers.setValue(null);
      dispatch(
        updateScheduleForm({
          maintenancePlanInfo: {
            planName: null,
            planType: null,
            planStatus: null,
            assetName: null,
            assetTypeName: null,
            startDate: null,
            endDate: null,
          },
        })
      );
    }
  }, [selectedRows]);

  const defaultPlanIndices = data?.data
    ? data?.data?.items
        ?.map((item: MaintenancePlan, index: number) =>
          item.planTypeName === 'Default' ? index : -1
        ) // Get index or -1
        ?.filter((index: number) => index !== -1)
    : []; // Filter out -1 values

  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <FormSectionInfo
          title="Maintenance Plan"
          info="Choose the plan for routine maintenance tasks."
          isRequired
        />
      </Flex>
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="27px"
        overflowX="auto"
      >
        <MaintenancePlanTable
          data={data?.data?.items ?? []}
          isLoading={isLoading || isFetching}
          handleSelectRow={setSelectedPlan}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          totalPages={data?.data.totalPages}
          showFooter={data?.data?.hasPreviousPage || data?.data?.hasNextPage}
          emptyLines={2}
          isSelectable={true}
          disabledRows={defaultPlanIndices}
          PopoverComponent={(data) => View(data)}
          showEmptyState={false}
        />
        {data?.data && !isLoading && !isFetching && showCustomizedButton && (
          <Text
            color="neutral.800"
            fontWeight={700}
            width="full"
            textAlign="center"
          >
            This asset has no customized plan.{' '}
            <Text
              fontWeight={700}
              as="span"
              color="#0366EF"
              textDecoration="underline"
              cursor="pointer"
              onClick={onOpen}
            >
              Create a customized plan
            </Text>
          </Text>
        )}
        {data?.data && !isLoading && !isFetching && (
          <InfoCard
            infoText="  Default Plan cannot be edited. A new schedule can only be added to
              a customized plan"
          />
        )}
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
      <CustomizedPlanModal
        isOpen={isOpen}
        onClose={onClose}
        assetId={assetId}
      />
    </HStack>
  );
};

export default Plan;
