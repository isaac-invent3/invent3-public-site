'use client';

import { Flex, HStack, Icon, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '../UI/PageHeader';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ListResponse } from '@repo/interfaces';
import { OPERATORS } from '@repo/constants';
import {
  FilterButton,
  SearchInput,
  SlideTransition,
} from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import _ from 'lodash';
import { generateSearchCriterion } from '@repo/utils';
import LogTable from './LogTable';
import {
  useGetAllAuditRecordsQuery,
  useSearchAuditRecordsMutation,
} from '~/lib/redux/services/log.services';
import { AuditRecord, LogFilter } from '~/lib/interfaces/log.interfaces';
import Filters from './LogTable/Filters';
import SummaryCards from './SummaryCards';
import LogDetail from './LogDetail';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateSelectedTableIds } from '~/lib/redux/slices/CommonSlice';
import useExport from '~/lib/hooks/useExport';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { setAuditLog } from '~/lib/redux/slices/AuditLogSlice';

export const initialFilterData = {
  userIds: [],
  systemContextTypeIds: [],
  startDate: undefined,
  endDate: undefined,
};

const LogManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAuditRecordsQuery({
    pageNumber,
    pageSize,
  });
  const [search, setSearch] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenDetails,
    onClose: onCloseDetails,
    onOpen: onOpenDetails,
  } = useDisclosure();
  const { updateSearchParam, getSearchParam } = useCustomSearchParams();
  const logId = getSearchParam(SYSTEM_CONTEXT_DETAILS.AUDIT.slug);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const { ExportPopover } = useExport({
    ids: selectedTableIds,
    exportTableName: 'AuditRecords',
    tableDisplayName: 'record',
    hasRequestedBy: true,
    isQueued: true,
  });

  const [searchData, setSearchData] = useState<
    ListResponse<AuditRecord> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] =
    useSearchAuditRecordsMutation({});
  const [filterData, setFilterData] = useState<LogFilter>(initialFilterData);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(filterData, (value) => _.isEmpty(value));

  const searchCriterion = {
    ...((!isFilterEmpty || search) && {
      orCriterion: [
        [
          ...generateSearchCriterion(
            'systemModuleContextTypeId',
            filterData.systemContextTypeIds.map((item) => item),
            OPERATORS.Equals
          ),
        ],
        ...[filterData.startDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'dateCreated',
              [item as string],
              OPERATORS.GreaterThan
            ),
          ]),
        ...[filterData.endDate]
          .filter(Boolean)
          .map((item) => [
            ...generateSearchCriterion(
              'dateCreated',
              [item as string],
              OPERATORS.LessThanOrEquals
            ),
          ]),
        ...(search
          ? [
              [
                {
                  columnName: 'message',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
              [
                {
                  columnName: 'username',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchLog, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchLog, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (logId) onOpenDetails();
  }, [logId]);

  // Reset Selected Row when SelectedIds array is emptied
  useEffect(() => {
    if (selectedTableIds.length === 0 && selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, [selectedTableIds]);

  // Update selectedTableIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = searchData?.items || data?.data?.items || [];
      const auditRecordIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.auditRecordId) // Access by index and get id
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedTableIds(auditRecordIds));
    }
    if (selectedRows.length === 0) {
      // Reset selectedTableIds when no rows are selected
      dispatch(updateSelectedTableIds([]));
    }
  }, [selectedRows]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <VStack
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing="24px"
          px={{ base: '16px', md: 0 }}
        >
          <PageHeader>Audit Log Management</PageHeader>
          <SummaryCards />
          <VStack
            spacing={0}
            alignItems="flex-start"
            width="full"
            mb="8px"
            pb="8px"
            borderBottom="1px solid #BBBBBB"
          >
            <HStack width="full" justifyContent="space-between" flexWrap="wrap">
              <SearchInput
                setSearch={setSearch}
                placeholderText="Search..."
                width={{ base: 'full', md: '363px' }}
              />
              <HStack spacing="16px">
                <FilterButton
                  icon={FilterIcon}
                  label="Filter"
                  handleClick={onToggle}
                  isActive={isOpen}
                />
                {ExportPopover}
              </HStack>
            </HStack>
            {isOpen && (
              <SlideTransition trigger={isOpen} direction="bottom">
                {isOpen && (
                  <Flex width="full" mt="8px">
                    <Filters
                      handleApplyFilter={handleSearch}
                      setFilterData={setFilterData}
                      filterData={filterData}
                    />
                  </Flex>
                )}
              </SlideTransition>
            )}
          </VStack>
        </VStack>

        <LogTable
          data={
            (search || !isFilterEmpty) && searchData
              ? searchData.items
              : (data?.data?.items ?? [])
          }
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          totalPages={
            (search || !isFilterEmpty) && searchData
              ? searchData?.totalPages
              : data?.data?.totalPages
          }
          showFooter={true}
          emptyLines={25}
          isSelectable
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showPopover
          handleSelectRow={(row) => {
            dispatch(setAuditLog(row));
            updateSearchParam(
              SYSTEM_CONTEXT_DETAILS.AUDIT.slug,
              row.auditRecordId
            );
          }}
        />
      </Flex>
      <LogDetail onClose={onCloseDetails} isOpen={isOpenDetails} />
    </>
  );
};

export default LogManagement;
