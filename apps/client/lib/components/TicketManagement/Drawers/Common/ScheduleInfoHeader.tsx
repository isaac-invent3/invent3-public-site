import { HStack, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { TaskPriorityColorCode } from '~/lib/utils/ColorCodes';
import { generateOptions } from '~/lib/utils/helperFunctions';
import TicketInfoDropDown from './TicketInfoDropdown';
import TicketInfoHeader from './TicketInfoHeader';

interface ScheduleInfoHeaderProps {
  data: Ticket;
}
const ScheduleInfoHeader = (props: ScheduleInfoHeaderProps) => {
  const { data } = props;

  const { data: taskStatuses, isLoading: isFetchingTaskStatuses } =
    useGetAllTaskStatusesQuery({
      pageSize: 25,
      pageNumber: 1,
    });

  const { data: taskPriorities, isLoading: isFetchingTaskPriorities } =
    useGetAllTaskPrioritiesQuery({
      pageSize: 25,
      pageNumber: 1,
    });

  // TODO: Change to FORMIK when API is Ready
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<Option | null>(
    null
  );

  const [selectedTaskPriority, setSelectedTaskPriority] =
    useState<Option | null>(null);

  const taskStatusesOptions = useMemo(() => {
    if (!taskStatuses?.data?.items) return [];
    return generateOptions(
      taskStatuses.data.items,
      'statusName',
      'taskStatusId'
    );
  }, [taskStatuses]);

  const getSelectedTaskStatus = useMemo(() => {
    if (!taskStatuses?.data?.items) return null;

    return taskStatuses.data.items.find(
      (item) => item?.taskStatusId === selectedTaskStatus?.value
    );
  }, [selectedTaskStatus, taskStatuses]);

  const taskPrioritiesOptions = useMemo(() => {
    if (!taskPriorities?.data?.items) return [];

    return generateOptions(
      taskPriorities.data.items,
      'priority',
      'taskPriorityId'
    );
  }, [taskPriorities]);

  const getSelectedTaskPriority = useMemo(() => {
    if (!taskPriorities?.data?.items) return null;

    return taskPriorities.data.items.find(
      (item) => item?.taskPriorityId === selectedTaskPriority?.value
    );
  }, [selectedTaskPriority, taskPriorities]);

  const ticketTypesOptions = [
    {
      label: 'Incident',
      value: 'incident',
    },
  ];

  return (
    <TicketInfoHeader data={data}>
      <HStack
        width="full"
        mt="24px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack spacing="40px" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Status:</Text>
            <TicketInfoDropDown
              label="Status"
              width="120px"
              options={taskStatusesOptions}
              isLoading={isFetchingTaskStatuses}
              selectedOptions={selectedTaskStatus}
              handleClick={(option) => setSelectedTaskStatus(option)}
              colorCode={
                getSelectedTaskStatus?.displayColorCode ??
                TaskPriorityColorCode['Low']
              }
            />
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Priority</Text>

            <TicketInfoDropDown
              label="Priority"
              width="110px"
              options={taskPrioritiesOptions}
              isLoading={isFetchingTaskPriorities}
              selectedOptions={selectedTaskPriority}
              handleClick={(option) => setSelectedTaskPriority(option)}
              colorCode={
                getSelectedTaskPriority?.displayColorCode ??
                TaskPriorityColorCode['Urgent']
              }
            />
          </VStack>
        </HStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Ticket Type</Text>
          {/* TODO: Change from Dummy data to Api Data when endpoint is ready */}
          <TicketInfoDropDown
            options={ticketTypesOptions}
            label="Ticket Type"
            handleClick={(option) => console.log(option)}
            selectedOptions={ticketTypesOptions[0]!}
            width="110px"
            colorCode="#6E7D8E33"
            showColorDot={false}
            hasBorder={false}
          />
        </VStack>
      </HStack>
    </TicketInfoHeader>
  );
};

export default ScheduleInfoHeader;
