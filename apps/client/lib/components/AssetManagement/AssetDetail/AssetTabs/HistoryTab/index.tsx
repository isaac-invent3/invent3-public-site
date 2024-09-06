import { Flex, Text, VStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import { assetData } from '~/lib/utils/MockData/asset';
import { DetailTable } from '../../DetailTable';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const Status = (status: string) => {
  return (
    <Text
      color={MaintenanceColorCode[status as 'completed']}
      fontSize="12px"
      fontWeight={500}
      lineHeight="14.26px"
    >
      {status}
    </Text>
  );
};

const Description = (description: string) => {
  return (
    <Text
      fontSize="12px"
      fontWeight={500}
      height="full"
      whiteSpace="normal"
      lineHeight="14px"
      noOfLines={3}
      textOverflow="ellipsis"
      width="full"
      maxW="217px"
    >
      {description}
      Routine check-up and software updates to ensure optimal performance.
      Antivirus software was updated, and unnecessary files were removed.
    </Text>
  );
};
const Technician = (name: string) => {
  return (
    <VStack alignItems="flex-start" spacing="4px">
      <Text fontSize="12px" lineHeight="14.26px" fontWeight={500} color="black">
        {name}
      </Text>
      <Text
        fontSize="12px"
        lineHeight="14.26px"
        fontWeight={500}
        color="neutral.600"
      >
        +1 555-123-4567
      </Text>
      <Text
        fontSize="12px"
        lineHeight="14.26px"
        fontWeight={500}
        color="neutral.600"
      >
        {name}
      </Text>
    </VStack>
  );
};

const HistoryTab = () => {
  const columnHelper = createColumnHelper<Asset>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('assetId', {
        cell: (info) => info.getValue(),
        header: 'ID',
      }),
      columnHelper.accessor('createdDate', {
        cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
        header: 'Date',
      }),
      columnHelper.accessor('locationId', {
        cell: (info) => info.getValue(),
        header: 'Type',
      }),
      columnHelper.accessor('description', {
        cell: (info) => Description(info.getValue()),
        header: 'Description',
      }),
      columnHelper.accessor('currentOwner', {
        cell: (info) => Technician(info.getValue()),
        header: 'Technician',
      }),
      columnHelper.accessor('initialValue', {
        cell: (info) => amountFormatter(info.getValue() ?? 0, '$'),
        header: 'Cost',
      }),
      columnHelper.accessor('statusId', {
        cell: () => Status('completed'),
        header: 'Status',
      }),
    ],
    [assetData] //eslint-disable-line
  );

  return (
    <Flex width="full" my="23px">
      <DetailTable
        columns={columns}
        data={assetData.slice(0, 5) ?? []}
        isLoading={false}
      />
    </Flex>
  );
};

export default HistoryTab;
