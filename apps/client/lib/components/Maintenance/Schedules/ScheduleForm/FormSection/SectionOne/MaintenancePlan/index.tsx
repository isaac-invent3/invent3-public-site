/* eslint-disable no-unused-vars */
import {
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useField } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import CustomizedPlanModal from '~/lib/components/Maintenance/Plans/Modals/CustomizedplanModal';
import PlanDetailsModal from '~/lib/components/Maintenance/Plans/Modals/PlanDetailModal';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import DataTable from '~/lib/components/UI/Table';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllMaintenancePlansByAssetIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

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
  const { data, isLoading, isFetching } =
    useGetAllMaintenancePlansByAssetIdQuery(
      {
        id: assetId,
        assetTypeId,
      },
      { skip: !assetId || !assetTypeId }
    );
  const [selectedPlan, setSelectedPlan] = useState<MaintenancePlan | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const columnHelper = createColumnHelper<MaintenancePlan>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showCustomizedButton, setShowCustomizedButton] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('planId');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.data) {
      const items: MaintenancePlan[] = data?.data;
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
      const items: MaintenancePlan[] = data?.data;
      const customizedPlan = items.find(
        (value, index) => index === selectedRows[0]
      );
      if (customizedPlan) {
        helpers.setValue(customizedPlan.maintenancePlanId);
        dispatch(
          updateScheduleForm({
            maintenancePlanInfo: {
              planName: customizedPlan.planName,
              planType: customizedPlan.planTypeName,
              planStatus: customizedPlan.planStatusName,
              assetName,
              assetTypeName: customizedPlan.assetTypeName,
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

  const columns = useMemo(
    () => [
      columnHelper.accessor('maintenancePlanId', {
        cell: (info) => info.getValue(),
        header: '#',
        enableSorting: false,
      }),
      columnHelper.accessor('planName', {
        cell: (info) => info.getValue(),
        header: 'Plan Name',
        enableSorting: false,
      }),
      columnHelper.accessor('planTypeName', {
        cell: (info) => info.getValue(),
        header: 'Plan Type',
        enableSorting: false,
      }),
      columnHelper.accessor('assetTypeName', {
        cell: (info) => info.getValue(),
        header: 'Asset Type',
        enableSorting: false,
      }),
      columnHelper.accessor('activeSchedules', {
        cell: (info) => info.getValue(),
        header: 'Total Schedules',
        enableSorting: false,
      }),
      columnHelper.accessor('startDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'Start Date',
        enableSorting: false,
      }),
      columnHelper.accessor('endDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return dateFormatter(value, 'DD / MM / YYYY');
          } else {
            return 'N/A';
          }
        },
        header: 'End Date',
        enableSorting: false,
      }),
      columnHelper.accessor('planStatusName', {
        cell: (info) => info.getValue(),
        header: 'Status',
        enableSorting: false,
      }),
      columnHelper.accessor('rowId', {
        cell: (info) => View(info.row.original),
        header: '',
        enableSorting: false,
      }),
    ],
    [[data?.data]] //eslint-disable-line
  );

  const defaultPlanIndices = data?.data
    ? data?.data
        ?.map((item: MaintenancePlan, index: number) =>
          item.planTypeName === 'Default' ? index : -1
        ) // Get index or -1
        ?.filter((index: number) => index !== -1)
    : []; // Filter out -1 values

  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Maintenance Plan"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="27px"
        overflowX="auto"
      >
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading || isFetching}
          handleSelectRow={setSelectedPlan}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showFooter={false}
          emptyLines={2}
          isSelectable={true}
          disabledRows={defaultPlanIndices}
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          customTableContainerStyle={{ rounded: 'none' }}
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
          <HStack
            py="8px"
            px="16px"
            rounded="8px"
            bgColor="#0366EF0D"
            spacing="16px"
          >
            <Icon as={InfoIcon} boxSize="16px" color="#0366EF" />
            <Text color="#0366EF" mt="2px">
              Default Plan cannot be edited. A new schedule can only be added to
              a customized plan
            </Text>
          </HStack>
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
