import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const SectionOne = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const { planName, assetTypeName, assetName, startDate, endDate, planType } =
    formDetails.maintenancePlanInfo;

  const details = [
    {
      label: 'Plan Type',
      value: planType,
    },
    {
      label: `Asset ${planType === 'Default' ? 'Type' : 'Name'}`,
      value: planType === 'Default' ? assetTypeName : assetName,
    },
    {
      label: 'Start Date',
      value: dateFormatter(startDate, 'Do MMM, YYYY'),
    },
    {
      label: 'End Date',
      value: dateFormatter(endDate, 'Do MMM, YYYY'),
    },
  ];
  return (
    <Flex width="full" gap="16px">
      <VStack alignItems="flex-start" spacing="8px" width="393px">
        <Text fontWeight={700} color="neutral.600">
          Plan Title
        </Text>
        <Text size="md" color="black">
          {planName}
        </Text>
      </VStack>
      <Flex width="full" gap="16px" justifyContent="space-between">
        {details.map((detail, index) => (
          <VStack alignItems="flex-start" spacing="8px" key={index}>
            <Text fontWeight={700} color="neutral.600">
              {detail.label}
            </Text>
            <Text size="md" color="black">
              {detail.value}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Flex>
  );
};

export default SectionOne;
