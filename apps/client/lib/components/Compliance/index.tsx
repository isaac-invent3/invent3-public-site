'use client';

import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import ComplianceTable from './ComplianceTable';
import { useGetAllFacilityComplianceQuery } from '~/lib/redux/services/asset/compliance.services';
import { FilterButton, SearchInput } from '@repo/ui/components';
import { FilterIcon } from '../CustomIcons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import useExport from '~/lib/hooks/useExport';
import Header from './Header';

const Compliance = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllFacilityComplianceQuery({
    pageNumber,
    pageSize,
  });
  const { isOpen, onToggle } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const { ExportPopover } = useExport({
    ids: selectedTableIds,
    exportTableName: 'AssetCompliances',
    tableDisplayName: 'compliance',
  });

  return (
    <>
      <Flex width="full" direction="column" pb="24px" gap="4px">
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="36px"
          px={{ base: '16px', md: 0 }}
        >
          <Header showComplianceType />
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
            {/* {isOpen && (
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
                      )} */}
          </VStack>
        </VStack>

        <ComplianceTable
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPages={data?.data?.totalPages}
          showFooter={true}
          emptyLines={25}
          isSelectable={false}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          showPopover
        />
      </Flex>
    </>
  );
};

export default Compliance;
