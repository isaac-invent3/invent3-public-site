import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import TicketTable from '~/lib/components/TicketManagement/TicketTable';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetOpenTicketsQuery } from '~/lib/redux/services/ticket.services';

const AssetTickets = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isFetching } = useGetAssetOpenTicketsQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    assetId,
  });

  return (
    <Flex
      width="full"
      alignItems="flex-end"
      gap="16px"
      direction="column"
      my="32px"
    >
      <TicketTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </Flex>
  );
};

export default AssetTickets;
