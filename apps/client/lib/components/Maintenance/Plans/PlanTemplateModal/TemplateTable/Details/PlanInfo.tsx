import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

interface PlanInfoProps {
  data: MaintenancePlan;
}

const PlanInfo = (props: PlanInfoProps) => {
  const { data } = props;
  const isCustomPlan = data?.planTypeId === MAINTENANCE_PLAN_ENUM.custom;
  const info = [
    {
      label: isCustomPlan ? 'Asset' : data?.groupTypeName,
      value: isCustomPlan ? 'N/A' : data?.assetGroupContextName,
    },
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
    <HStack
      width="full"
      spacing="47px"
      bgColor="primary.500"
      p="16px"
      roundedTop="8px"
    >
      {info.map((item, index) => (
        <VStack alignItems="flex-start" spacing="8px" key={index}>
          <Text color="neutral.300">{item.label}</Text>
          <Text
            color="white"
            fontWeight={700}
            fontSize="14px"
            lineHeight="22px"
          >
            {item.value}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default PlanInfo;
