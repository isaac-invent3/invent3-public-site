import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface PlanInfoProps {
  data: MaintenancePlan;
}

const PlanInfo = (props: PlanInfoProps) => {
  const { data } = props;
  const info = [
    {
      label: 'Start Date',
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'End Date',
      value: data?.startDate
        ? dateFormatter(data?.endDate, 'Do MMM, YYYY')
        : 'N/A',
    },
  ];

  return (
    <HStack width="full" spacing="150px">
      {info.map((item, index) => (
        <VStack alignItems="flex-start" spacing="8px" key={index}>
          <Text color="neutral.600">{item.label}</Text>
          <Text color="black">{item.value}</Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default PlanInfo;
