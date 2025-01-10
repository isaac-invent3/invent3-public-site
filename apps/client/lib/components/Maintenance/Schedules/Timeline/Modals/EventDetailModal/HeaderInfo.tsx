import { Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import moment from 'moment';

import TaskInstanceListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskInstanceListView';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

interface HeaderInfoProps {
  data: MaintenanceScheduleInstance;
}
const HeaderInfo = (props: HeaderInfoProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const endTime = data?.durationInHours
    ? moment(data?.scheduledDate).add(data?.durationInHours, 'hours') // Add the duration if available
    : null;

  return (
    <>
      <VStack spacing="16px" width="full" alignItems="flex-start">
        <Text color="neutral.600">
          {data.scheduledDate
            ? `${dateFormatter(data.scheduledDate, 'dddd, MMMM D, ')} ${dateFormatter(data?.scheduledDate, 'h:mmA')} - ${endTime ? endTime.format('h:mmA') : 'N/A'}`
            : 'N/A'}
        </Text>
        <HStack minW="full" justifyContent="space-between" spacing="84px">
          <VStack alignItems="flex-start" spacing="2px">
            <Heading
              color="neutral.800"
              fontSize="20px"
              lineHeight="23.76px"
              fontWeight={800}
            >
              {data.scheduleInstanceName}
            </Heading>
            <Text color="neutral.600">{data?.maintenanceType}</Text>
          </VStack>
          <HStack spacing="84px" alignItems="flex-start">
            <VStack spacing="4px" alignItems="flex-start">
              <Text color="neutral.700">Tasks</Text>
              <HStack spacing="8px">
                <Text
                  onClick={onOpen}
                  color="#0366EF"
                  fontWeight={700}
                  size="md"
                  textDecoration="underline"
                  cursor="pointer"
                >
                  {data?.activeTasksCount ?? 0}{' '}
                  {`Task${data?.activeTasksCount > 1 ? 's' : ''}`}
                </Text>
                <Text color="neutral.600">added</Text>
              </HStack>
            </VStack>
            <VStack spacing="4px" alignItems="flex-start">
              <Text color="neutral.700">Status:</Text>
              <Text
                fontWeight={800}
                color={MaintenanceColorCode[data?.currentStatus as 'Completed']}
              >
                {data?.currentStatus ?? 'N/A'}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </VStack>
      <TaskInstanceListView
        isOpen={isOpen}
        onClose={onClose}
        scheduleId={data?.scheduleInstanceId}
        showPopover={true}
      />
    </>
  );
};

export default HeaderInfo;
