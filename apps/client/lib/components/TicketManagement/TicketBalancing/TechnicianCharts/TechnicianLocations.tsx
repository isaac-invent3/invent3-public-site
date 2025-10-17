import { HStack, Progress, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';

const TechnicianLocations = () => {
  const data = [
    {
      location: 'Lagos HQ',
      noOfTechnician: 2,
    },
    {
      location: 'Abuja',
      noOfTechnician: 8,
    },
    {
      location: 'Kano',
      noOfTechnician: 6,
    },
    {
      location: 'PH',
      noOfTechnician: 2,
    },
  ];
  return (
    <VStack
      width="full"
      height="full"
      p={4}
      alignItems="flex-start"
      spacing="34px"
      bgColor="white"
      rounded="8px"
      minH="357px"
    >
      <CardHeader>Technician Load Distribution</CardHeader>
      <VStack width="full" spacing={4}>
        {data?.map((item, index) => (
          <VStack width="full" key={index} spacing="9px">
            <HStack width="full" justifyContent="space-between">
              <Text fontWeight={700} color="neutral.800">
                {item.location}
              </Text>
              <Text fontWeight={700} color="neutral.800">
                {item.noOfTechnician} Techs
              </Text>
            </HStack>
            <Progress
              value={item.noOfTechnician}
              size="md"
              width="full"
              rounded="full"
              max={10}
              sx={{
                '& > div': {
                  backgroundColor: '#EABC30',
                },
                backgroundColor: '#F2F1F1',
              }}
            />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default TechnicianLocations;
