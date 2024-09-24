import { Flex, Text, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { DetailTable } from '../../DetailTable';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { useGetMaintenanceHistoryByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { useAppSelector } from '~/lib/redux/hooks';

const Status = (status: string) => {
  return (
    <Text
      color={MaintenanceColorCode[status as 'Completed']}
      textTransform="capitalize"
    >
      {status}
    </Text>
  );
};

const Description = (description: string) => {
  return (
    <Text
      height="full"
      whiteSpace="normal"
      noOfLines={3}
      textOverflow="ellipsis"
      width="full"
      maxW="217px"
    >
      {description}
    </Text>
  );
};
const Technician = (info: MaintenancePlan) => {
  return (
    <VStack alignItems="flex-start" spacing="4px">
      <Text color="black">{info.contactPerson}</Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
      >
        {info.contactPersonPhoneNo}
      </Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
      >
        {info.contactPersonEmail}
      </Text>
    </VStack>
  );
};

const HistoryTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading } = useGetMaintenanceHistoryByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );
  const columnHelper = createColumnHelper<MaintenancePlan>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: '#',
      }),
      columnHelper.accessor('completionDate', {
        cell: (info) =>
          info.getValue()
            ? dateFormatter(info.getValue(), 'YYYY-MM-DD')
            : 'N/A',
        header: 'Date',
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => info.getValue(),
        header: 'Maintenance Type',
      }),
      columnHelper.accessor('comments', {
        cell: (info) =>
          info.getValue() ? Description(info.getValue()) : 'N/A',
        header: 'Description',
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) =>
          !info.row.original.contactPerson &&
          !info.row.original.contactPersonEmail &&
          !info.row.original.contactPersonPhoneNo
            ? 'N/A'
            : Technician(info.row.original),
        header: 'Contact Person',
      }),
      columnHelper.accessor('totalCost', {
        cell: (info) => amountFormatter(info.getValue() ?? 0),
        header: 'Cost',
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) => (info.getValue() ? Status(info.getValue()) : 'N/A'),
        header: 'Status',
      }),
    ],
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <Flex width="full" my="23px">
      <DetailTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        pageSize={pageSize}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        setPageSize={setPageSize}
      />
    </Flex>
  );
};

export default HistoryTab;
