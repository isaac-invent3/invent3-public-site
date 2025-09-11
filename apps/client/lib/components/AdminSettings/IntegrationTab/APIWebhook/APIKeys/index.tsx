import { Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import SectionWrapper from '~/lib/components/UserSettings/Common/SectionWrapper';
import { CompanyApiKeys } from '~/lib/interfaces/apiKey.interfaces';
import { useGetAllCompanyApiKeysQuery } from '~/lib/redux/services/apiKey.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

const APIKeys = () => {
  const columnHelper = createColumnHelper<CompanyApiKeys>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllCompanyApiKeysQuery({
    pageNumber,
    pageSize,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('companyApiKeyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'API Key Name',
          enableSorting: false,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Generated On',
          enableSorting: false,
        }),
        columnHelper.accessor('statusId', {
          cell: (info) => <GenericStatusBox text="Active" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('companyApiKeyId', {
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: '',
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
        columnHelper.accessor('companyApiKeyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'API Key Name',
          enableSorting: false,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Generated On',
          enableSorting: false,
        }),
        columnHelper.accessor('lastUsed', {
          cell: (info) =>
            info.getValue()
              ? dateFormatter(info.getValue(), 'DD / MM / YYYY')
              : 'N/A',
          header: 'Last Used',
          enableSorting: false,
        }),
        columnHelper.accessor('usageLimit', {
          cell: (info) => info.getValue()?.toLocaleString() ?? 'N/A',
          header: 'Usage Limit',
          enableSorting: false,
        }),
        columnHelper.accessor('statusId', {
          cell: (info) => <GenericStatusBox text="Active" />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('companyApiKeyId', {
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <SectionWrapper
      title="List of Active API Keys"
      subtitle="Manage and monitor active keys."
      sectionInfoWidth="212px"
      sectionInfoStyle={{
        maxW: { base: '60%', md: '212px' },
      }}
      spacing={{ lg: '220px' }}
    >
      <Flex width="full" overflow="auto">
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
      </Flex>
    </SectionWrapper>
  );
};

export default APIKeys;
