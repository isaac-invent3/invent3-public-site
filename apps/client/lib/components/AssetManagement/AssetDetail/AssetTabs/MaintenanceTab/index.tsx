import { Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// import Button from '~/lib/components/UI/Button';
import MaintenanceCard from './MaintenanceCard';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetPlannedMaintenanceByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import Button from '~/lib/components/UI/Button';

const MaintenanceTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const { data, isLoading } = useGetPlannedMaintenanceByAssetIdQuery(
    { id: assetId, pageSize, pageNumber: currentPage },
    { skip: !assetId }
  );

  if (isLoading) {
    return (
      <VStack spacing="16px" width="full" my="16px">
        {Array(4)
          .fill('')
          .map((_, index) => (
            <Skeleton width="full" rounded="8px" key={index} height="96px" />
          ))}
      </VStack>
    );
  }
  return (
    <Flex
      width="full"
      alignItems="flex-end"
      gap="16px"
      direction="column"
      my="16px"
    >
      {/* <Button
        customStyles={{ width: 'min-content', minH: '28px' }}
        variant="secondary"
      >
        Edit Maintenance Schedule
      </Button> */}
      <VStack width="full" spacing="16px">
        {data?.data?.items.length >= 1 ? (
          data?.data?.items.map((item: MaintenanceSchedule) => (
            <MaintenanceCard data={item} key={item.scheduleId} />
          ))
        ) : (
          <Text
            width="full"
            size="md"
            fontWeight={400}
            fontStyle="italic"
            my="41px"
            color="neutral.600"
            textAlign="center"
          >
            No Planned Maintenance at the moment.
          </Text>
        )}
      </VStack>
      {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
        <Flex justifyContent="space-between" width="full" mt={4}>
          <Button
            variant="secondary"
            handleClick={() => setCurrentPage((prev) => prev - 1)}
            isDisabled={currentPage === 1}
            customStyles={{ width: '100px' }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            handleClick={() => setCurrentPage((prev) => prev + 1)}
            isDisabled={
              data?.data?.totalPages === 0 ||
              currentPage === data?.data?.totalPages
            }
            customStyles={{ width: '100px' }}
          >
            Next
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default MaintenanceTab;
