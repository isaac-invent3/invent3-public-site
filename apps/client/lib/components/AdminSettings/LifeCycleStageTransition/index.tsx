import {
  Heading,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import { useGetLifecyleStagesQuery } from '~/lib/redux/services/asset/lifeCycle.services';
import { LifeCycleStages } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';
import StageTransitionRuleDrawer from './StageTransitionRuleDrawer';

const LifeCycleStageTransition = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<LifeCycleStages>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetLifecyleStagesQuery({
    pageNumber,
    pageSize,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('lifeCycleStageName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Destination Stage',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: (info) => <GenericStatusBox text="Acitve" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('lifeCycleId', {
          cell: (info) => <Text color="blue.500">Edit</Text>,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('lifeCycleStageName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Destination Stage',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: () => 'N/A',
          header: 'Description',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: () => 'N/A',
          header: 'Conditions',
          enableSorting: false,
        }),
        columnHelper.display({
          cell: (info) => <GenericStatusBox text="Acitve" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('lastModifiedDate', {
          cell: (info) => `${dateFormatter(info.getValue(), 'MMM DD, YYYY')}`,
          header: 'Last Updated',
          enableSorting: false,
        }),
        columnHelper.accessor('lifeCycleId', {
          cell: (info) => <Text color="blue.500">Edit</Text>,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <>
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt={{ base: '23px', lg: '35px' }}
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
      >
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing={2}>
            <Heading color="primary.500" size="md" lineHeight="100%">
              Lifecycle Stage Transition Rules
            </Heading>
            <Text color="neutral.600">
              Define how assets move from one lifecycle stage to another. Rules
              ensure consistent and compliant transitions.
            </Text>
          </VStack>
          <Text
            color="blue.500"
            size="md"
            lineHeight="100%"
            fontWeight={700}
            cursor="pointer"
            onClick={onOpen}
            whiteSpace="nowrap"
          >
            Add New Rule
          </Text>
        </HStack>
        <DataTable
          columns={isMobile ? mobileColumns : columns}
          data={data?.data?.items ?? []}
          showFooter={data?.data ? data?.data?.totalPages > 1 : false}
          isLoading={isLoading}
          isFetching={isFetching}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          emptyLines={3}
          maxTdWidth="250px"
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
            bgColor: '#B4BFCA',
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          customTableContainerStyle={{
            rounded: '4px',
          }}
        />
      </VStack>
      <StageTransitionRuleDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LifeCycleStageTransition;
