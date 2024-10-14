import {
  Flex,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  AggregateMaintenanceSchedule,
  MaintenanceSchedule,
} from '~/lib/interfaces/maintenance.interfaces';
import { CloseIcon } from '~/lib/components/CustomIcons';
import { dateFormatter } from '~/lib/utils/Formatters';
import Event from '../../Events';
import { useAppSelector } from '~/lib/redux/hooks';
import { AREA_ENUM } from '~/lib/utils/constants';
import { useGetMaintenanceSchedulesByAreaQuery } from '~/lib/redux/services/maintenance/schedule.services';

interface AggregateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AggregateMaintenanceSchedule;
}
const AggregateDetailModal = (props: AggregateDetailModalProps) => {
  const { selectedCountry } = useAppSelector(
    (state) => state.maintenance.scheduleInfo
  );
  const { isOpen, onClose, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [localSchedules, setLocalSchedules] = useState<MaintenanceSchedule[]>(
    []
  );
  const { data: allSchedules, isLoading } =
    useGetMaintenanceSchedulesByAreaQuery({
      areaId: selectedCountry?.value,
      areaType: AREA_ENUM.country,
      startDate: data.scheduledDate,
      endDate: data.maxCompletionDate,
      pageNumber: currentPage,
      pageSize: 25,
    });

  useEffect(() => {
    if (allSchedules?.data?.items) {
      setLocalSchedules((prev) => [...prev, ...allSchedules.data.items]);
    }
  }, [allSchedules]);

  const completedSchedules = localSchedules.filter(
    (item) => item.currentStatus === 'Completed'
  );
  const pendingSchedules = localSchedules.filter(
    (item) => item.currentStatus === 'Not Started'
  );
  const missedSchedules = localSchedules.filter(
    (item) => item.currentStatus === 'Missed'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW={{ base: '90%', lg: '507px' }}
        minH={{ base: '90%', lg: '550px' }}
        maxHeight="90%"
        rounded="4px"
      >
        <ModalBody p={0} m={0} position="relative">
          <Icon
            as={CloseIcon}
            boxSize="24px"
            position="absolute"
            mt="16px"
            mr="16px"
            right={0}
            color="primary.500"
            cursor="pointer"
            onClick={() => onClose()}
          />
          <VStack width="full" spacing="40px" alignItems="flex-start" p="16px">
            <VStack alignItems="flex-start" spacing="16px" width="full">
              <Text color="neutral.600">
                {dateFormatter(data?.scheduledDate, 'dddd, MMM DD')}
              </Text>
              <Heading
                fontSize="20px"
                lineHeight="23.76px"
                fontWeight={800}
                color="neutral.800"
              >
                Schedules for {dateFormatter(data?.scheduledDate, 'hh:mmA')}
              </Heading>
            </VStack>
            <Flex id="schedulesDiv" height="full" overflowY="auto" width="full">
              {isLoading ? (
                <SimpleGrid
                  columns={3}
                  width="full"
                  columnGap="32px"
                  rowGap="6px"
                >
                  {Array(12)
                    .fill('')
                    .map((_, idx) => (
                      <Skeleton width="full" height="50px" key={idx} />
                    ))}
                </SimpleGrid>
              ) : (
                <InfiniteScroll
                  dataLength={localSchedules.length}
                  next={() => setCurrentPage((prev) => prev + 1)}
                  hasMore={
                    (allSchedules?.data &&
                      allSchedules.data.pageNumber <
                        allSchedules.data.totalPages) ??
                    false
                  }
                  scrollableTarget="schedulesDiv"
                  loader={
                    <Flex
                      my={{ base: '8px', lg: '16px' }}
                      width="full"
                      justifyContent="center"
                    >
                      <Spinner
                        size={{ base: 'md', lg: 'lg' }}
                        color="primary2"
                        thickness="4px"
                        emptyColor="gray.200"
                      />
                    </Flex>
                  }
                >
                  <HStack spacing="32px" alignItems="flex-start" width="full">
                    {/* Completed Schedules Starts */}
                    {completedSchedules.length >= 1 && (
                      <VStack width="full" spacing="6px">
                        {completedSchedules.map((item, index) => (
                          <Flex width="full" height="50px" key={index}>
                            <Event
                              event={{
                                resource: {
                                  ...item,
                                  currentStatus: 'completed',
                                },
                              }}
                              key={index}
                            />
                          </Flex>
                        ))}
                      </VStack>
                    )}
                    {/* Completed Schedules Ends */}
                    {/* Pending Schedules Starts */}
                    {pendingSchedules.length >= 1 && (
                      <VStack width="full" spacing="6px">
                        {pendingSchedules.map((item, index) => (
                          <Flex width="full" height="50px" key={index}>
                            <Event event={{ resource: item }} key={index} />
                          </Flex>
                        ))}
                      </VStack>
                    )}
                    {/* Pending Schedules Ends */}
                    {/* Missed Schedules Starts */}
                    {missedSchedules.length >= 1 && (
                      <VStack width="full" spacing="6px">
                        {missedSchedules.map((item, index) => (
                          <Flex width="full" height="50px" key={index}>
                            <Event
                              event={{
                                resource: { ...item, currentStatus: 'missed' },
                              }}
                              key={index}
                            />
                          </Flex>
                        ))}
                      </VStack>
                    )}
                    {/* Missed Schedules Ends */}
                  </HStack>
                </InfiniteScroll>
              )}
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AggregateDetailModal;
