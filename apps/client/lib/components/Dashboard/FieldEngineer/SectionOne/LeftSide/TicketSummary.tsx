import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../../../Common/SummaryCardWrapper';
import ProgressIndicator from '../../../Common/ProgressIndicator';
import DoughtnutChart from '../../../Common/Charts/DoughtnutChart';
import { useSession } from 'next-auth/react';
import { useGetFieldEngineerTicketOverviewQuery } from '~/lib/redux/services/dashboard/fieldengineer.services';

const TicketSummary = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { data } = useGetFieldEngineerTicketOverviewQuery({
    userId: user?.userId!,
  });
  const cardKeys = [
    {
      value: data?.data?.assignedTickets ?? 0,
      label: 'Assigned',
      color: '#EABC30',
    },
    {
      value: data?.data?.inProgress ?? 0,
      label: 'In Progress',
      color: '#0E2642',
    },
    {
      value: data?.data?.completed ?? 0,
      label: 'Completed',
      color: '#0366EF',
    },
  ];
  return (
    <SummaryCardWrapper
      title="TIckets"
      containerStyle={{ width: 'full', height: 'full' }}
    >
      <HStack
        width="full"
        height="full"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <VStack width="50%" alignItems="flex-start" spacing="38px">
          <VStack position="relative">
            <Flex>
              <DoughtnutChart
                labels={['Assigned', 'In Progress', 'Completed']}
                datasets={[
                  {
                    data: cardKeys.map((item) => item.value),
                    backgroundColor: cardKeys.map((item) => item.color),
                    borderWidth: 4,
                    borderRadius: 4,
                  },
                ]}
                type="half"
                height="90px"
                cutout="70%"
              />
            </Flex>
            <VStack spacing="4px" position="absolute" top="50px">
              <Text fontWeight={800} size="md" color="primary.500">
                {(data?.data?.assignedTickets ?? 0) +
                  (data?.data?.completed ?? 0) +
                  (data?.data?.inProgress ?? 0)}{' '}
                Tickets
              </Text>
              <Text color="neutral.600" fontWeight={700}>
                This month
              </Text>
            </VStack>
          </VStack>
          <HStack spacing="4px">
            <ProgressIndicator valueChange={0} />
            <Text color="neutral.600" fontWeight={700} whiteSpace="nowrap">
              Compared to last month
            </Text>
          </HStack>
        </VStack>
        <VStack spacing="16px" alignItems="flex-start">
          {cardKeys.map((item, index) => (
            <HStack key={index} spacing="8px">
              <Box
                rounded="2px"
                width="12px"
                height="12px"
                bgColor={item.color}
              />
              <Text color="neutral.800" whiteSpace="nowrap">
                {item.value} {item.label}
              </Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </SummaryCardWrapper>
  );
};

export default TicketSummary;
