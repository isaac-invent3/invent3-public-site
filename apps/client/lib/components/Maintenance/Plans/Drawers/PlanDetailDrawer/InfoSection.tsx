import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface InfoSectionProps {
  data: MaintenancePlan;
}
const InfoSection = (props: InfoSectionProps) => {
  const { data } = props;

  const CONTENT1 = [
    {
      label: 'Plan ID:',
      value: data?.maintenancePlanId,
    },
    {
      label: 'Type:',
      value: data?.planTypeName,
    },
    {
      label: 'No. Of Asset:',
      value: 'N/A',
    },
  ];

  const CONTENT2 = [
    {
      label: 'Total Schedules:',
      value:
        data?.activeSchedules && data?.activeSchedules < 9
          ? `0${data?.activeSchedules}`
          : data?.activeSchedules,
    },
    {
      label: 'Plan Scope:',
      value: data?.assetName ? 'Asset' : data?.groupTypeName,
    },
    {
      label: 'Start Date:',
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'DD / MM / YYYY')
        : 'N/A',
    },
    {
      label: 'End Date:',
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'DD / MM / YYYY')
        : 'N/A',
    },
  ];
  return (
    <VStack
      width="full"
      bgColor="#B4BFCA4D"
      pt="24px"
      pb="16px"
      pl="42px"
      pr="24px"
      spacing="18px"
      alignItems="flex-start"
    >
      <Heading
        color="black"
        fontSize="30px"
        fontWeight={800}
        lineHeight="35.64px"
      >
        #{data?.maintenancePlanId} {data?.planName}
      </Heading>

      <HStack width="full" spacing="75px" alignItems="flex-start">
        <VStack spacing="8px" alignItems="flex-start">
          <HStack spacing="8px">
            <Text size="md" color="neutral.600" minW="81px">
              Status:
            </Text>
            <GenericStatusBox text="Active" />
          </HStack>
          {CONTENT1.map((item, index) => (
            <HStack spacing="8px" key={index}>
              <Text size="md" color="neutral.600" minW="81px">
                {item.label}
              </Text>
              <Text color="black">{item.value}</Text>
            </HStack>
          ))}
        </VStack>
        <VStack spacing="8px" alignItems="flex-start">
          {CONTENT2.map((item, index) => (
            <HStack spacing="8px" key={index}>
              <Text size="md" color="neutral.600" minW="102px">
                {item.label}
              </Text>
              <Text color="black">{item.value}</Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default InfoSection;
