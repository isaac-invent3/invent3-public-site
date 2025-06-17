import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import { AssetCategoryComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';
import { Button, FilterButton, SearchInput } from '@repo/ui/components';
import useExport from '~/lib/hooks/useExport';
import { FilterIcon } from '~/lib/components/CustomIcons';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { useGetAllAssetBasedCompliancesQuery } from '~/lib/redux/services/asset/compliance.services';
import { useParams } from 'next/navigation';
import CategoryComplianceTable from './CategoryComplianceTable';
import SummaryInfo from './SummaryInfo';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import AssetComplianceDetailDrawer from '../../Drawers/AssetComplianceDetailDrawer';
import AssetDetail from '~/lib/components/AssetManagement/AssetDetail';
import MarkComplianceStatusDrawer from '../../Drawers/MarkComplianceStatusDrawer';

interface CategoryComplianceProps {
  data: AssetCategoryComplianceSummary;
}

const CategoryCompliance = ({ data }: CategoryComplianceProps) => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const {
    isOpen: isOpenAssetCompliance,
    onOpen: onOpenAssetCompliance,
    onClose: onCloseAssetCompliance,
  } = useDisclosure();
  const {
    isOpen: isOpenMarkComplianceStatus,
    onOpen: onOpenMarkComplianceStatus,
    onClose: onCloseMarkComplianceStatus,
  } = useDisclosure();
  const {
    isOpen: isOpenAsset,
    onOpen: onOpenAsset,
    onClose: onCloseAsset,
  } = useDisclosure();
  const assetComplianceSlug = SYSTEM_CONTEXT_DETAILS.COMPLIANCE.slug;
  const assetSlug = SYSTEM_CONTEXT_DETAILS.ASSETS.slug;
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();

  const complianceAssetId = getSearchParam(
    SYSTEM_CONTEXT_DETAILS.COMPLIANCE.slug
  )
    ? Number(getSearchParam(assetComplianceSlug))
    : null;
  const assetId = getSearchParam(SYSTEM_CONTEXT_DETAILS.ASSETS.slug)
    ? Number(getSearchParam(assetSlug))
    : null;
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

  useEffect(() => {
    if (complianceAssetId) {
      onOpenAssetCompliance();
    }
  }, [complianceAssetId]);
  useEffect(() => {
    if (assetId) {
      onOpenAsset();
    }
  }, [assetId]);
  return (
    <>
      <Flex
        width="full"
        direction="column"
        pb="24px"
        gap="32px"
        px={{ base: '16px', md: 0 }}
      >
        <Header showComplianceType={false}>
          <Button
            customStyles={{
              width: '184px',
              height: { base: '36px', md: 'min-content' },
              alignSelf: 'end',
            }}
            variant="outline"
            handleClick={onOpenMarkComplianceStatus}
          >
            Mark Compliance Status
          </Button>
        </Header>
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
            handleSelectRow={(row) => {
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.ASSETS.slug,
                row.assetId
              );
            }}
          />
        </VStack>
      </Flex>
      <MarkComplianceStatusDrawer
        isOpen={isOpenMarkComplianceStatus}
        onClose={onCloseMarkComplianceStatus}
      />
      <AssetComplianceDetailDrawer
        isOpen={isOpenAssetCompliance}
        onClose={onCloseAssetCompliance}
      />
      <AssetDetail isOpen={isOpenAsset} onClose={onCloseAsset} />
    </>
  );
};

export default CategoryCompliance;
