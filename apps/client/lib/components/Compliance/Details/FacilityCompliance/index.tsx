import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from '../../Header';
import { FacilityAssetComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';
import SummaryInfo from './SummaryInfo';
import { FilterButton, SearchInput } from '@repo/ui/components';
import useExport from '~/lib/hooks/useExport';
import { FilterIcon } from '~/lib/components/CustomIcons';
import FacilityComplianceTable from './FacilityComplianceTable';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllCategoryComplianceByFacilityQuery } from '~/lib/redux/services/asset/compliance.services';
import { useParams } from 'next/navigation';

interface FacilityComplianceProps {
  data: FacilityAssetComplianceSummary;
}

const FacilityCompliance = ({ data }: FacilityComplianceProps) => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const params = useParams();
  const id = params?.facilityId as unknown as number;
  const {
    data: complianceCategory,
    isLoading,
    isFetching,
  } = useGetAllCategoryComplianceByFacilityQuery({
    facilityId: id!,
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
          <FacilityComplianceTable
            data={complianceCategory?.data?.items ?? []}
            isLoading={isLoading}
            isFetching={isFetching}
            totalPages={complianceCategory?.data?.totalPages}
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

export default FacilityCompliance;
