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
import React, { useMemo, useState } from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import CustomizedPlanModal from '~/lib/components/Maintenance/Plans/Modals/CustomizedplanModal';
import PlanDetailsModal from '~/lib/components/Maintenance/Plans/Modals/PlanDetailModal';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import DataTable from '~/lib/components/UI/Table';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
// import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllMaintenancePlanQuery } from '~/lib/redux/services/maintenance/plan.services';
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
  const { data, isLoading } = useGetAllMaintenancePlanQuery({
    pageSize: 2,
  });
  const [selectedPlan, setSelectedPlan] = useState<MaintenancePlan | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const columnHelper = createColumnHelper<MaintenancePlan>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      columnHelper.accessor('serialNo', {
        cell: (info) => info.getValue(),
        header: 'Type',
        enableSorting: false,
      }),
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: 'Asset Type',
        enableSorting: false,
      }),
      columnHelper.accessor('openTasks', {
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
      columnHelper.accessor('serialNo', {
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
    [[data?.data?.items]] //eslint-disable-line
  );

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
          data={data?.data?.items}
          isLoading={isLoading}
          handleSelectRow={setSelectedPlan}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showFooter={false}
          emptyLines={2}
          isSelectable={true}
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
        <HStack
          py="8px"
          px="16px"
          rounded="8px"
          bgColor="#0366EF0D"
          spacing="16px"
        >
          <Icon as={InfoIcon} boxSize="16px" color="#0366EF" />
          <Text color="#0366EF" mt="2px">
            Default Plan cannot be edited. A new schedule can only be added to a
            customized plan
          </Text>
        </HStack>
      </VStack>
      <CustomizedPlanModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Plan;
