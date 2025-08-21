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
import { generateSearchCriteria, generateSearchCriterion } from '@repo/utils';
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
import { usePageFilter } from '~/lib/hooks/usePageFilter';

export const initialFilterData = {
  userIds: [],
  systemContextTypeIds: [],
  startDate: undefined,
  endDate: undefined,
};

const LogManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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
    showInvent3: true,
  });

  const [searchData, setSearchData] = useState<
    ListResponse<AuditRecord> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] =
    useSearchAuditRecordsMutation({});

  const {
    filterData,
    setFilterData,
    appliedFilter,
    isFilterEmpty,
    applyFilter,
    clearFilter,
  } = usePageFilter<LogFilter>(initialFilterData);

  const { data, isLoading, isFetching } = useGetAllAuditRecordsQuery(
    {
      pageNumber,
      pageSize,
    },
    { skip: !isFilterEmpty || search !== '' }
  );

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(search, appliedFilter, {
      systemContextTypeIds: {
        key: 'systemModuleContextTypeId',
        operator: OPERATORS.Equals,
      },
      startDate: { key: 'dateCreated', operator: OPERATORS.GreaterThan },
      endDate: { key: 'dateCreated', operator: OPERATORS.GreaterThan },
    });
    const finalOrCriterion = [
      ...orCriterion,
      ...(search
        ? [
            [
              ...['username', 'firstName', 'lastName', 'email'].map((item) => ({
                columnName: item,
                columnValue: search,
                operation: OPERATORS.Contains,
              })),
              ...(!isNaN(Number(search))
                ? [
                    {
                      columnName: 'auditRecordId',
                      columnValue: search,
                      operation: OPERATORS.Equals,
                    },
                  ]
                : []),
            ],
          ]
        : []),
    ];
    const payload = {
      pageNumber: pageNumber,
      pageSize,
      orCriterion: finalOrCriterion,
    };

    if (finalOrCriterion.length > 0) {
      const response = await handleSubmit(searchLog, payload, '');
      setSearchData(response?.data?.data);
    }
  }, [searchLog, search, appliedFilter, pageNumber, pageSize]);

  // Trigger search when search or input changes or applied filter changes or pagination updates
  useEffect(() => {
    if (search || !isFilterEmpty) {
      handleSearch();
    }
  }, [search, appliedFilter, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search || isFilterEmpty) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search, appliedFilter]);

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
                      setFilterData={setFilterData}
                      filterData={filterData}
                      onApply={() => {
                        applyFilter();
                        handleSearch(); // manually trigger
                      }}
                      onClear={() => {
                        clearFilter();
                        handleSearch(); // to reload default data
                      }}
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
