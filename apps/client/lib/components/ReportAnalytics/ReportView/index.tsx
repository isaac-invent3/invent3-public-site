'use client';
import { Flex, VStack } from '@chakra-ui/react';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';
import AssetTable from '../../AssetManagement/Common/AssetTable';
import Header from '../Header';

const ReportView = () => {
  const { data, isLoading, isFetching } = useGetAllAssetQuery({
    pageNumber: 1,
    pageSize: 30,
  });

  return (
    <Flex width="full" direction="column" pb="24px" pt="12px">
      <Header />
      <VStack bg="white" padding="16px">
        <AssetTable
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          pageNumber={1}
          pageSize={30}
          totalPages={data?.data?.totalPages}
          showFooter={true}
          emptyLines={25}
          isSelectable={true}
        />
      </VStack>
    </Flex>
  );
};

export default ReportView;
