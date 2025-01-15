'use client';

import { Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import DetailHeader from '../Common/Header';
import TemplateInfo from '../Common/TemplateInfo';
import { useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { useAppSelector } from '~/lib/redux/hooks';
import HeaderInfo from '~/lib/components/Maintenance/Schedules/ScheduleTemplateModal/Details/HeaderInfo';
import ScheduleInfo from '~/lib/components/Maintenance/Schedules/ScheduleTemplateModal/Details/ScheduleInfo';

const MaintenanceSchedule = () => {
  const template = useAppSelector((state) => state.template.template);
  const { data, isLoading } =
    useGetMaintenenanceScheduleInfoHeaderByScheduleIDQuery(
      { id: template?.contextId! },
      {
        skip: !template?.contextId,
      }
    );
  return (
    <Flex width="full" direction="column" pb="24px">
      <DetailHeader />
      <Flex width="full" mt="16px">
        <TemplateInfo />
      </Flex>
      <VStack
        alignItems="flex-start"
        width="full"
        px="16px"
        py="24px"
        bgColor="white"
        borderBottomRadius="8px"
        minH="60vh"
      >
        {isLoading && <Skeleton width="full" height="400px" rounded="8px" />}
        {!isLoading && data?.data && (
          <VStack width="full" spacing="40px" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="22px" width="full">
              <Text fontWeight={800} size="md">
                Asset associated to the Shcedule
              </Text>
              <HeaderInfo data={data?.data} type="secondary" />
            </VStack>
            <VStack alignItems="flex-start" width="full" spacing="8px">
              <Text fontWeight={800} color="black" size="md">
                Schedule Details
              </Text>
              <ScheduleInfo schedule={data?.data} />
            </VStack>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default MaintenanceSchedule;
