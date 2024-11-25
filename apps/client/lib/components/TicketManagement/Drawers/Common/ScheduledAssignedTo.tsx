import { Avatar, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { useGetMaintenanceSchedulesByTicketIdQuery } from '~/lib/redux/services/maintenance/schedule.services';

interface ScheduledAssignedToProps {
  ticketId: number;
}
const ScheduledAssignedTo = (props: ScheduledAssignedToProps) => {
  const { ticketId } = props;

  const { data: maintenanceSchedule, isLoading: isFetchingSchedule } =
    useGetMaintenanceSchedulesByTicketIdQuery(ticketId);

  return (
    <HStack spacing="8px">
      <Avatar width="30px" height="30px" />
      <Flex direction="column">
        <Text color="black">
          {isFetchingSchedule && (
            <Spinner
              size={{ base: 'md', lg: 'lg' }}
              color="primary2"
              thickness="4px"
              emptyColor="gray.200"
            />
          )}

          {!isFetchingSchedule && (
            <>{maintenanceSchedule?.data.assignedTo ?? 'N/A'}</>
          )}
        </Text>
      </Flex>
    </HStack>
  );
};

export default ScheduledAssignedTo;
