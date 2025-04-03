import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { DATE_PERIOD, ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { useGetTicketResolutionPerformanceQuery } from '~/lib/redux/services/dashboard/executive.services';
import { TicketResolution } from '~/lib/interfaces/dashboard/executive.interfaces';
import TicketModal from '../../Modals/TicketModal';

const TicketResolutionPerformance = () => {
  const { data, isLoading } = useGetTicketResolutionPerformanceQuery({
    datePeriod: DATE_PERIOD.YEAR,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const columnHelper = createColumnHelper<TicketResolution>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('category', {
          cell: (info) => info.getValue(),
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('priority', {
          cell: (info) => info.getValue(),
          header: 'Priority',
          enableSorting: false,
        }),
        columnHelper.accessor('assignedTo', {
          cell: (info) => info.getValue(),
          header: 'Assigned To',
          enableSorting: false,
        }),
        columnHelper.accessor('status', {
          cell: (info) => info.getValue(),
          header: 'Status',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <>
      <VStack
        width="full"
        height="full"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
      >
        <HStack width="full" justifyContent="space-between">
          <HStack>
            <CardHeader>Ticket Resolution Performance</CardHeader>
            <Text
              color="neutral.800"
              py="6px"
              px="8px"
              rounded="4px"
              bgColor="neutral.200"
            >
              This Month
            </Text>
          </HStack>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: '68px',
              fontSize: '12px',
              lineHeight: '14.26px',
            }}
          >
            View All
          </Button>
        </HStack>
        <Flex width="full">
          <DataTable
            columns={columns}
            data={data?.data?.items ?? []}
            isLoading={isLoading}
            showFooter={false}
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
            maxTdWidth="250px"
          />
        </Flex>
      </VStack>
      {isOpen && <TicketModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default TicketResolutionPerformance;
