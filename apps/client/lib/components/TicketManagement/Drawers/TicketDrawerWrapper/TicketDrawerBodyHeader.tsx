import { HStack, Text, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import {
  SelectedTicketAction,
  Ticket,
} from '~/lib/interfaces/ticket.interfaces';
import { useGetMaintenanceSchedulesByTicketIdQuery } from '~/lib/redux/services/maintenance/schedule.services';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { useGetAllTicketTypesQuery } from '~/lib/redux/services/ticket.services';
import { COLOR_CODES_FALLBACK, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateOptions } from '~/lib/utils/helperFunctions';
import TicketInfoDropDown from '../Common/TicketInfoDropdown';
import TicketInfoHeader from '../Common/TicketInfoHeader';

interface TicketDrawerBodyHeaderProps {
  data: Ticket;
  action: SelectedTicketAction;
}

export interface GenricTicketFormDetails {
  ticketStatusId: number | null;
  ticketPriorityId: number | null;
  ticketTypeId: number | null;
}

const TicketDrawerBodyHeader = (props: TicketDrawerBodyHeaderProps) => {
  const { data, action } = props;

  if (action === 'view' || action === 'assign') {
    return (
      <TicketInfoHeader data={data}>
        <HStack
          width="full"
          mt="24px"
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          spacing="20px"
        >
          <HStack spacing="20px" alignItems="flex-start" flexWrap="wrap">
            <VStack alignItems="flex-start" spacing="8px">
              <Text color="neutral.600">Status:</Text>

              <GenericStatusBox
                text={data.statusName}
                width="120px"
                colorCode={data.statusColorCode}
              />
            </VStack>

            <VStack alignItems="flex-start" spacing="8px">
              <Text color="neutral.600">Priority</Text>

              <GenericStatusBox
                text={data.ticketPriorityName}
                width="110px"
                colorCode={data.priorityColorCode}
              />
            </VStack>
          </HStack>

          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Ticket Type</Text>
            <Text>{data.ticketTypeName}</Text>
          </VStack>
        </HStack>
      </TicketInfoHeader>
    );
  }

  const { values } = useFormikContext<GenricTicketFormDetails>();

  const { data: taskStatuses, isLoading: isFetchingTaskStatuses } =
    useGetAllTaskStatusesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const { data: taskPriorities, isLoading: isFetchingTaskPriorities } =
    useGetAllTaskPrioritiesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const { data: ticketTypes, isLoading: isFetchingTicketTypes } =
    useGetAllTicketTypesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const { data: maintenanceSchedule, isLoading: isFetchingSchedule } =
    useGetMaintenanceSchedulesByTicketIdQuery({
      ticketId: data.ticketId,
    });

  const getItemColorCode = (
    selectedItemId: number | null,
    type: 'status' | 'priority'
  ) => {
    if (!selectedItemId) return COLOR_CODES_FALLBACK.default;

    if (type === 'status') {
      if (!taskStatuses?.data?.items) return COLOR_CODES_FALLBACK.default;

      const selectedItem = taskStatuses.data.items.find(
        (item) => item?.taskStatusId === selectedItemId
      );

      if (!selectedItem) return COLOR_CODES_FALLBACK.default;

      return selectedItem.displayColorCode;
    }

    if (type === 'priority') {
      if (!taskPriorities?.data?.items) return COLOR_CODES_FALLBACK.default;

      const selectedItem = taskPriorities.data.items.find(
        (item) => item?.taskPriorityId === selectedItemId
      );

      if (!selectedItem) return COLOR_CODES_FALLBACK.default;

      return selectedItem.displayColorCode;
    }
  };

  return (
    <TicketInfoHeader data={data} isUpdateTicket={action === 'edit'}>
      <HStack
        width="full"
        mt="24px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack
          spacing="20px"
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          width="full"
        >
          <HStack spacing="16px" flexWrap="wrap">
            <VStack alignItems="flex-start" spacing="8px">
              <Text color="neutral.600">Status:</Text>
              <TicketInfoDropDown
                width="120px"
                label="Status"
                name="ticketStatusId"
                isLoading={isFetchingTaskStatuses}
                colorCode={getItemColorCode(values.ticketStatusId, 'status')}
                options={generateOptions(
                  taskStatuses?.data.items,
                  'statusName',
                  'taskStatusId'
                )}
              />
            </VStack>

            <VStack alignItems="flex-start" spacing="8px">
              <Text color="neutral.600">Priority</Text>

              <TicketInfoDropDown
                width="110px"
                label="Priority"
                name="ticketPriorityId"
                isLoading={isFetchingTaskPriorities}
                colorCode={getItemColorCode(
                  values.ticketPriorityId,
                  'priority'
                )}
                options={generateOptions(
                  taskPriorities?.data.items,
                  'priority',
                  'taskPriorityId'
                )}
              />
            </VStack>
          </HStack>

          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600">Ticket Type</Text>
            <TicketInfoDropDown
              label="Ticket Type"
              name="ticketTypeId"
              isLoading={isFetchingTicketTypes}
              width={action === 'edit' ? '110px' : '150px'}
              colorCode="#6E7D8E33"
              showColorDot={false}
              hasBorder={false}
              options={generateOptions(
                ticketTypes?.data.items,
                'ticketTypeName',
                'ticketTypeId'
              )}
            />
          </VStack>

          {action === 'edit' && (
            <VStack alignItems="flex-start" spacing="15px">
              <Text color="neutral.600">Due Date</Text>
              {/* TODO: Insert End Date here */}
              <Text color="black">
                {isFetchingSchedule
                  ? 'Loading ...'
                  : dateFormatter(
                      maintenanceSchedule?.data.endDate,
                      'DD-MM-YYYY '
                    )}
              </Text>
            </VStack>
          )}
        </HStack>
      </HStack>
    </TicketInfoHeader>
  );
};

export default TicketDrawerBodyHeader;
