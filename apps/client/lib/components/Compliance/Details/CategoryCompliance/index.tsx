import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from '../../Header';
import { AssetCategoryComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';
import { FilterButton, SearchInput } from '@repo/ui/components';
import useExport from '~/lib/hooks/useExport';
import { FilterIcon } from '~/lib/components/CustomIcons';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllAssetBasedCompliancesQuery } from '~/lib/redux/services/asset/compliance.services';
import { useParams } from 'next/navigation';
import CategoryComplianceTable from './CategoryComplianceTable';
import SummaryInfo from './SummaryInfo';

interface CategoryComplianceProps {
  data: AssetCategoryComplianceSummary;
}

const CategoryCompliance = ({ data }: CategoryComplianceProps) => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const params = useParams();
  const facilityId = params?.facilityId as unknown as number;
  const id = params?.id as unknown as number;
  const {
    data: complianceCategory,
    isLoading,
    isFetching,
  } = useGetAllAssetBasedCompliancesQuery({
    facilityId: facilityId!,
    categoryId: id!,
    pageNumber,
    pageSize,
  });
  const { isOpen, onToggle } = useDisclosure();
  const { ExportPopover } = useExport({
    ids: [],
    exportTableName: 'AssetCompliances',
    tableDisplayName: 'compliance',
  });

  return (
    <>
      <Flex
        width="full"
        direction="column"
        pb="24px"
        gap="32px"
        px={{ base: '16px', md: 0 }}
      >
        <Header />
        <SummaryInfo data={data} />
        <VStack width="full" alignItems="flex-start" spacing="8px">
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
          <CategoryComplianceTable
            data={complianceCategory?.data ?? []}
            isLoading={isLoading}
            isFetching={isFetching}
            totalPages={1}
            showFooter={true}
            emptyLines={25}
            isSelectable={false}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            showPopover
          />
        </VStack>
      </Flex>
    </>
  );
};

export default CategoryCompliance;
