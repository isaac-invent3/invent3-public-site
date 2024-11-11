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
      value: data?.maintenancePlanId,
    },
  ];

  const CONTENT2 = [
    {
      label: 'Total Schedules:',
      value:
        data?.activeSchedules && data?.activeSchedules < 9
          ? `0${data?.activeSchedules}`
          : data?.activeSchedules,
      isLabelBolden: false,
    },
    {
      label: 'Asset Type:',
      value: data?.maintenancePlanId,
      isLabelBolden: false,
    },
    {
      label: 'Start Date:',
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'DD / MM / YYYY')
        : 'N/A',
      isLabelBolden: true,
    },
    {
      label: 'End Date:',
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'DD / MM / YYYY')
        : 'N/A',
      isLabelBolden: true,
    },
  ];
  return (
    <VStack
      width="full"
      bgColor="#B4BFCA4D"
      py="24px"
      pl="42px"
      pr="24px"
      spacing="16px"
      alignItems="flex-start"
    >
      <Heading
        color="black"
        fontSize="32px"
        fontWeight={800}
        lineHeight="38.02px"
      >
        #{data?.maintenancePlanId} {data?.planName}
      </Heading>

      <HStack width="full" spacing="75px" alignItems="flex-start">
        <VStack spacing="8px" alignItems="flex-start">
          <HStack spacing="8px">
            <Text size="md" color="neutral.600" minW="50px">
              Status:
            </Text>
            <GenericStatusBox text="Active" />
          </HStack>
          {CONTENT1.map((item, index) => (
            <HStack spacing="8px" key={index}>
              <Text size="md" color="neutral.600" minW="50px" fontWeight={800}>
                {item.label}
              </Text>
              <Text size="md" color="black" fontWeight={800}>
                {item.value}
              </Text>
            </HStack>
          ))}
        </VStack>
        <VStack spacing="8px" alignItems="flex-start">
          {CONTENT2.map((item, index) => (
            <HStack spacing="8px" key={index}>
              <Text
                size="md"
                color="neutral.600"
                minW="102px"
                fontWeight={item.isLabelBolden ? 800 : 500}
              >
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
