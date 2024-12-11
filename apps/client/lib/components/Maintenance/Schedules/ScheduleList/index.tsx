import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScheduleSkeletonLoader from './ScheduleSkeletonLoader';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import MaintenanceScheduleCard from '../MaintenanceScheduleCard';

interface ScheduleListProps {
  isLoading: boolean;
  hasMore: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  allSchedules: MaintenanceSchedule[];
  scrollableTarget: string;
}
const ScheduleList = (props: ScheduleListProps) => {
  const { isLoading, hasMore, setCurrentPage, allSchedules, scrollableTarget } =
    props;
  return (
    <InfiniteScroll
      dataLength={allSchedules.length}
      next={() => {
        setCurrentPage((prev) => prev + 1);
      }}
      hasMore={hasMore}
      scrollableTarget={scrollableTarget}
      loader={<ScheduleSkeletonLoader />}
    >
      {isLoading ? (
        <ScheduleSkeletonLoader />
      ) : allSchedules.length >= 1 ? (
        <VStack width="full" spacing="16px">
          {allSchedules.map((item: MaintenanceSchedule) => {
            return (
              <MaintenanceScheduleCard
                data={item}
                isPartOfDefaultPlan={false}
                key={item.rowId}
              />
            );
          })}
        </VStack>
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
          No Maintenance Schedule at the moment.
        </Text>
      )}
    </InfiniteScroll>
  );
};

export default ScheduleList;
