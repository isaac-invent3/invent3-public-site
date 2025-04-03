import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DATE_PERIOD, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useSearchCompaniesMutation } from '~/lib/redux/services/company.services';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@repo/ui/components';
import { useGetComplianceAssessmentQuery } from '~/lib/redux/services/dashboard/executive.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { AssetComplaince } from '~/lib/interfaces/asset/compliance.interfaces';

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
  const { data, isLoading, isFetching } = useGetComplianceAssessmentQuery({
    datePeriod: DATE_PERIOD.YEAR,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Company>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] = useSearchCompaniesMutation(
    {}
  );

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'companyName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchLog, searchCriterion, '');
    setSearchData(response?.data);
  }, [searchLog, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      //   handleSearch();
    }
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
        columnHelper.accessor('standard', {
          cell: (info) => info.getValue(),
          header: 'Compliance Standard',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => info.getValue(),
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
    [[data]] //eslint-disable-line
  );

  const ComplianceRiskAssessmentTable = (
    <Flex width="full" direction="column">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
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
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : data?.data?.totalPages,

    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useComplianceRiskAssessmentTable;
