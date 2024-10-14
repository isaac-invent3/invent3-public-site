import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

interface HeaderInfoProps {
  data: MaintenanceSchedule;
}
const HeaderInfo = (props: HeaderInfoProps) => {
  const { data } = props;

  const endTime = data?.durationInHours
    ? moment(data?.scheduledDate).add(data?.durationInHours, 'hours') // Add the duration if available
    : null;

  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <Text color="neutral.600">
        {data.scheduledDate
          ? `${dateFormatter(data.scheduledDate, 'dddd, MMMM D, ')} ${dateFormatter(data?.scheduledDate, 'h:mmA')} - ${endTime ? endTime.format('h:mmA') : 'N/A'}`
          : 'N/A'}
      </Text>
      <HStack minW="full" spacing="20px" justifyContent="space-between">
        <VStack alignItems="flex-start" spacing="2px" minW="73%">
          <Heading
            color="neutral.800"
            fontSize="20px"
            lineHeight="23.76px"
            fontWeight={800}
          >
            {data.planName}
          </Heading>
          <Text color="neutral.600">{data?.maintenanceType}</Text>
        </VStack>
        <VStack spacing="4px" alignItems="flex-start" width="27%">
          <Text color="neutral.700">Status:</Text>
          <Text
            fontWeight={800}
            color={MaintenanceColorCode[data?.currentStatus as 'Completed']}
          >
            {data?.currentStatus ?? 'N/A'}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default HeaderInfo;
