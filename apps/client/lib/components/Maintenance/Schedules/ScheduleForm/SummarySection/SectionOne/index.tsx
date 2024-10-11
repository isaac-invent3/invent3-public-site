import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);

  const otherFields = [
    {
      label: 'Location',
      value: formDetails.assetLocation,
    },
    {
      label: 'Maintenance Plan',
      value: formDetails.planName,
    },
  ];

  return (
    <SimpleGrid columns={4} spacing="16px">
      <VStack alignItems="flex-start" width="full" spacing="8px">
        <Text color="neutral.600">Asset</Text>
        <Text color="black">{formDetails.assetName}</Text>
        <Text color="neutral.600" fontWeight={800}>
          {formDetails.assetId}
        </Text>
      </VStack>
      {otherFields.map((item, index) => (
        <VStack alignItems="flex-start" width="full" spacing="8px" key={index}>
          <Text color="neutral.600">{item.label}</Text>
          <Text color="black">{item.value}</Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};

export default SectionOne;
