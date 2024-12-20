import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import AssetTable from '../../AssetManagement/Common/AssetTable';

const ReportTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  return (
    <Flex width="full" mt="24px">
      <AssetTable
        data={[]}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={true}
        emptyLines={25}
        isSelectable={true}
      />
    </Flex>
  );
};

export default ReportTable;
