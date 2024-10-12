import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const SectionTwo = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);

  const contentOne = [
    {
      label: 'Schedule Title',
      value: formDetails.name,
    },
    {
      label: 'Type',
      value: formDetails.typeName,
    },
  ];

  const dateFields = [
    {
      label: 'Scheduled Date',
      value: formDetails.scheduledDate,
    },
    {
      label: 'Completion Date',
      value: formDetails.completionDate,
    },
  ];

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap="16px"
      width="full"
      height="full"
    >
      <GridItem colSpan={2} width="full">
        <HStack width="full" alignItems="flex-start" spacing="16px">
          {contentOne.map((item, index) => (
            <VStack
              alignItems="flex-start"
              width="full"
              spacing="8px"
              key={index}
            >
              <Text color="neutral.600">{item.label}</Text>
              <Text color="black">{item.value}</Text>
            </VStack>
          ))}
        </HStack>
      </GridItem>
      <GridItem colSpan={2} width="full" height="full">
        <HStack spacing="16px" alignItems="flex-start" width="full">
          <VStack width="70%" spacing="8px" alignItems="flex-start">
            <Text color="neutral.600">Description</Text>
            <Text
              color="neutral.700"
              bgColor="#F0F0F0"
              py="8px"
              px="11px"
              minH="103px"
              width="full"
            >
              {formDetails.description}
            </Text>
          </VStack>
          <VStack width="30%" height="full" spacing="16px">
            {dateFields.map((item, index) => (
              <VStack
                alignItems="flex-start"
                width="full"
                spacing="8px"
                key={index}
              >
                <Text color="neutral.600">{item.label}</Text>
                <Text color="black">
                  {dateFormatter(
                    item.value ?? '',
                    'Do MMM, YYYY hh:mmA',
                    'DD/MM/YYYY hh:mmA'
                  )}
                </Text>
              </VStack>
            ))}
          </VStack>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
