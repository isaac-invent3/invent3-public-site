import { Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { ButtonPagination } from '@repo/ui/components';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllMaintenancePlansByAssetIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import PlanCard from '~/lib/components/Maintenance/Plans/PlanCard';

const MaintenanceTab = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId, assetTypeId } = assetData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading } = useGetAllMaintenancePlansByAssetIdQuery(
    {
      id: assetId,
      assetTypeId: assetTypeId!,
      pageSize,
      pageNumber: currentPage,
    },
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
      my="32px"
    >
      <VStack width="full" spacing="16px" mb={4}>
        {data?.data && data?.data?.items?.length >= 1 ? (
          data?.data?.items?.map((item: MaintenancePlan) => (
            <PlanCard data={item} key={item.maintenancePlanId} />
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
            No Maintenance Plan for this asset at the moment.
          </Text>
        )}
      </VStack>
      {(data?.data?.hasPreviousPage || data?.data?.hasNextPage) && (
        <ButtonPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.data?.totalPages}
        />
      )}
    </Flex>
  );
};

export default MaintenanceTab;
