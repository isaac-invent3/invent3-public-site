import { HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { ClockIcon } from '~/lib/components/CustomIcons/Dashboard';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';

interface SingleScheduleProps {
  data: MaintenanceScheduleInstance;
}
const SingleSchedule = (props: SingleScheduleProps) => {
  const { data } = props;
  return (
    <SimpleGrid
      columns={3}
      width="full"
      justifyContent="space-between"
      spacing="10px"
    >
      <HStack spacing="8px" alignItems="flex-start">
        <Icon as={ClockIcon} boxSize="12px" color="black" />
        <Text color="black">{data?.estimatedDurationInHours ?? 0}hrs</Text>
      </HStack>
      <Text color="neutral.800" noOfLines={1} textOverflow="ellipsis">
        {data?.scheduleInstanceName}
      </Text>
      <Text color="neutral.800" noOfLines={1} textOverflow="ellipsis">
        {data?.assetLocation}
      </Text>
    </SimpleGrid>
  );
};

export default SingleSchedule;
