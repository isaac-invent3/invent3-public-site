import { Flex, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetFloorSettingsByFloorIdQuery } from '~/lib/redux/services/settings.services';

const FloorPlan = () => {
  const { selectedFloor } = useAppSelector((state) => state.dashboard.info);
  const { data, isLoading, isFetching } = useGetFloorSettingsByFloorIdQuery(
    { floorId: selectedFloor?.value as number },
    { skip: !selectedFloor?.value }
  );
  return (
    <Skeleton isLoaded={!isLoading || !isFetching} width="full" height="full">
      <Flex position="relative" width="full" maxW="1182px" height="800px">
        {data?.data?.floor?.imageBasePrefix &&
          data?.data?.floor?.floorPlanImage && (
            <Image
              src={`${data?.data?.floor?.imageBasePrefix}${data?.data?.floor?.floorPlanImage}`}
              alt="floor_image"
              fill
            />
          )}
      </Flex>
    </Skeleton>
  );
};

export default FloorPlan;
