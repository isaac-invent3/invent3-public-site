import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@repo/ui/components';
import { useSearchComplianceAssessmentMutation } from '~/lib/redux/services/dashboard/executive.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { AssetComplaince } from '~/lib/interfaces/asset/compliance.interfaces';
import { generateSearchCriteria } from '@repo/utils';

interface ComplianceRiskAssessmentTableProps {
  search?: string;
  customPageSize?: number;
}

const useComplianceRiskAssessmentTable = (
  props: ComplianceRiskAssessmentTableProps
) => {
  const { search, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<AssetComplaince>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchComplianceRiskAssessment, { isLoading }] =
    useSearchComplianceAssessmentMutation({});

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(
      undefined,
      {
        search: [search],
      },
      {
        search: {
          key: ['policyName', 'statusName'],
          operator: OPERATORS.Contains,
        },
      },
      undefined
    );
    const payload = {
      pageNumber,
      pageSize: customPageSize ?? pageSize,
      orCriterion,
    };

    const response = await handleSubmit(
      searchComplianceRiskAssessment,
      payload,
      ''
    );
    setSearchData(response?.data);
  }, [searchComplianceRiskAssessment, search, pageSize, pageNumber]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    handleSearch();
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  const columnHelper = createColumnHelper<AssetComplaince>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('policyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Compliance Standard',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('lastInspectionDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD-MM-YYYY') ?? 'N/A',
          header: 'Last Audit Date',
          enableSorting: false,
        }),
        columnHelper.accessor('expiryDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD-MM-YYYY') ?? 'N/A',
          header: 'Expiry Date',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[searchData?.data?.items]] //eslint-disable-line
  );

  const ComplianceRiskAssessmentTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={searchData?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isLoading}
        showFooter={false}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </Flex>
  );
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    handleSearch,
    ComplianceRiskAssessmentTable,
    totalPages: search && searchData ? searchData.data?.totalPages : 0,
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useComplianceRiskAssessmentTable;
