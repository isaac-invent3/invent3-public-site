import { HStack, Progress, Skeleton, Text, VStack } from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import { useGetTicketTechnicianLocationsQuery } from '~/lib/redux/services/ticket.services';

const TechnicianLocations = () => {
  const { data, isLoading } = useGetTicketTechnicianLocationsQuery();

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
        {isLoading &&
          Array(6)
            .fill('')
            .map((_, index) => (
              <Skeleton height="20px" rounded="full" width="full" key={index} />
            ))}
        {!isLoading &&
          data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item, index) => (
            <VStack width="full" key={index} spacing="9px">
              <HStack width="full" justifyContent="space-between">
                <Text fontWeight={700} color="neutral.800">
                  {item.facility}
                </Text>
                <Text fontWeight={700} color="neutral.800">
                  {item.totalTechnicians} Technicians
                </Text>
              </HStack>
              <Progress
                value={item.totalTechnicians}
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
        {!isLoading && data?.data?.length === 0 && (
          <EmptyState
            emptyText="No Data at the moment"
            containerStyle={{ my: 10 }}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default TechnicianLocations;
