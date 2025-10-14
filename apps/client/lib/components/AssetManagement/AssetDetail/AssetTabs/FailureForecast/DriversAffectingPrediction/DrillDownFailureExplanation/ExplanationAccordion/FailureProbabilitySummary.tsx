import { Flex, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';

const FailureProbabilitySummary = () => {
  const info = [
    {
      label: 'Model Confidence',
      value: '87%',
    },
    {
      label: 'Data Coverage',
      value: '95%',
    },
    {
      label: 'Recent Alerts',
      value: '3 Active',
    },
    {
      label: 'Mean Time to Failure',
      value: '4 Days',
    },
  ];
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      spacing={8}
      py={6}
    >
      <SimpleGrid columns={2} gap={2}>
        {info.map((item, index) => (
          <VStack
            width={{ base: 'full', lg: '152px' }}
            p={4}
            rounded="8px"
            bgColor="#9B9B9B1A"
            spacing="10px"
            key={index}
            position="relative"
            alignItems="flex-start"
          >
            <Text color="neutral.600">{item.label}</Text>
            <Text color="primary.500" fontSize="20px">
              {item.value}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
      <VStack width={{ base: 'full', lg: '40%' }} spacing={4}>
        <Text color="neutral.800" fontWeight={700}>
          Failure Probability
        </Text>
        <VStack position="relative" width="full">
          <Flex height="83px" width="143px">
            <DoughtnutChart
              labels={['Failure Probability']}
              datasets={[
                {
                  data: [87],
                  backgroundColor: ['#F50000'],
                  borderRadius: 0,
                },
              ]}
              type="half"
              height="83px"
              cutout="75%"
            />
          </Flex>
          <VStack spacing="4px" position="absolute" top="50px">
            <Text color="primary.500" fontWeight={700} fontSize="32px">
              87%
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Stack>
  );
};

export default FailureProbabilitySummary;
