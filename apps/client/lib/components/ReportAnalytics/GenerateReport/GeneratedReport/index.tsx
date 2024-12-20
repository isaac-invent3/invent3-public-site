import { VStack } from '@chakra-ui/react';
import { ListResponse } from '@repo/interfaces';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { GenerateReportResponse } from '~/lib/interfaces/report.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface GeneratedReportProps {
  response: ListResponse<GenerateReportResponse>;
}

const GeneratedReport = (props: GeneratedReportProps) => {
  const { response } = props;

  const columnHelper = createColumnHelper<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const generateDynamicColumns = (data: GenerateReportResponse[]) => {
    if (!data || data.length === 0) return [];

    // Get keys from the first record to generate columns dynamically
    const dynamicKeys = Object.keys(data[0]?.model || {});

    return dynamicKeys.map((key) => {
      return columnHelper.accessor(key, {
        cell: (info) => info.row.original.model[key],
        header: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Format key to readable header
        enableSorting: false,
      });
    });
  };

  const columns = useMemo(
    () => {
      const dynamicColumns = generateDynamicColumns(response.items || []);

      return dynamicColumns;
    },
    [[response.items]] //eslint-disable-line
  );

  return (
    <VStack>
      {/* <ReportViewFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        report={reportInfo?.data}
      /> */}

      <DataTable
        columns={columns}
        data={response.items ?? []}
        totalPages={response.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={5}
        isSelectable
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </VStack>
  );
};

export default GeneratedReport;
