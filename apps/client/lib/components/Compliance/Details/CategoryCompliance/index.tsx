import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import { AssetCategoryComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';
import { Button, FilterButton, SearchInput } from '@repo/ui/components';
import useExport from '~/lib/hooks/useExport';
import { BulkSearchIcon, FilterIcon } from '~/lib/components/CustomIcons';
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
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateSelectedTableIds } from '~/lib/redux/slices/CommonSlice';
import TableActions from './TableActions';

interface CategoryComplianceProps {
  data: AssetCategoryComplianceSummary;
}

const CategoryCompliance = ({ data }: CategoryComplianceProps) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenAssetCompliance,
    onOpen: onOpenAssetCompliance,
    onClose: onCloseAssetCompliance,
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
  const { ExportPopover } = useExport({
    ids: [],
    exportTableName: 'AssetCompliances',
    tableDisplayName: 'compliance',
  });

  //Filter control
  useEffect(() => {
    if (activeFilter && !isOpen) {
      onOpen();
    }
    if (!activeFilter) {
      onClose();
    }
  }, [activeFilter]);

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

  // Reset Selected Row when SelectedIds array is emptied
  useEffect(() => {
    if (selectedTableIds.length === 0 && selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, [selectedTableIds]);

  // Update selectedTableIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = complianceCategory?.data?.items || [];
      const auditRecordIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.assetId) // Access by index and get id
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
      <Flex
        width="full"
        direction="column"
        pb="24px"
        gap="32px"
        px={{ base: '16px', md: 0 }}
      >
        <Header showComplianceType={false} />
        <SummaryInfo data={data} />
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <HStack width="full" justifyContent="space-between" flexWrap="wrap">
            <HStack spacing="16px">
              <SearchInput
                setSearch={setSearch}
                placeholderText="Search..."
                width={{ base: 'full', md: '363px' }}
              />
              {selectedRows.length >= 1 && (
                <Text whiteSpace="nowrap">
                  <Text as="span" fontWeight={800}>
                    {selectedRows.length}
                  </Text>{' '}
                  rows selected
                </Text>
              )}
            </HStack>
            <HStack spacing="16px">
              <FilterButton
                icon={BulkSearchIcon}
                label="Bulk Actions"
                handleClick={() =>
                  setActiveFilter((prev) => (prev === 'bulk' ? null : 'bulk'))
                }
                isActive={activeFilter === 'bulk'}
              />
              <FilterButton
                icon={FilterIcon}
                label="Filter"
                handleClick={() =>
                  setActiveFilter((prev) =>
                    prev === 'general' ? null : 'general'
                  )
                }
                isActive={activeFilter === 'general'}
              />
              {ExportPopover}
            </HStack>
          </HStack>
          <Flex width="full" mb="8px">
            <TableActions activeFilter={activeFilter} isOpen={isOpen} />
          </Flex>
          <CategoryComplianceTable
            data={complianceCategory?.data?.items ?? []}
            isLoading={isLoading}
            isFetching={isFetching}
            totalPages={complianceCategory?.data?.totalPages}
            showFooter={true}
            emptyLines={25}
            isSelectable={true}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            selectMultipleRows
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
      <AssetComplianceDetailDrawer
        isOpen={isOpenAssetCompliance}
        onClose={onCloseAssetCompliance}
      />
      <AssetDetail isOpen={isOpenAsset} onClose={onCloseAsset} />
    </>
  );
};

export default CategoryCompliance;
