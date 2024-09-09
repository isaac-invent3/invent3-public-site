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
      Routine check-up and software updates to ensure optimal performance.
      Antivirus software was updated, and unnecessary files were removed.
    </Text>
  );
};
const Technician = (name: string) => {
  return (
    <VStack alignItems="flex-start" spacing="4px">
      <Text color="black">{name}</Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
      >
        +1 555-123-4567
      </Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
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
      columnHelper.accessor('dateCreated', {
        cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DD'),
        header: 'Date',
      }),
      columnHelper.accessor('roomName', {
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
      columnHelper.accessor('currentStatus', {
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
