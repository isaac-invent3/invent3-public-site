import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import MaintenancePriorityList from './MaintenancePriorityList';
import SummaryCard from '../../../Common/SummaryCard';
import AIContainer from '../../../Common/AIContainer';
import { useParams } from 'next/navigation';
import { useGetBMSPredictiveJarvisRecommendationQuery } from '~/lib/redux/services/dashboard/bms.services';

const PredictiveMaintenance = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data } = useGetBMSPredictiveJarvisRecommendationQuery(
    { facilityId: id },
    { skip: !id }
  );

  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        gap="16px"
        minH="415px"
      >
        <MaintenancePriorityList />
        <VStack height="full" width="full">
          <SummaryCard title="Maintenance" icon="/adjust.png">
            <Text fontWeight={400} fontSize="20px" lineHeight="100%" mb="61px">
              Boiler due for maintenance in{' '}
              <Text
                as="span"
                fontWeight={700}
                fontSize="20px"
                lineHeight="100%"
              >
                15 days
              </Text>
            </Text>
          </SummaryCard>
          <AIContainer title="Predictive Analysis">
            <VStack
              bgColor="white"
              spacing="24px"
              alignItems="flex-start"
              mt="28px"
            >
              {data?.data?.map((item, index) => (
                <Text fontWeight={700} fontSize="14px" key={index}>
                  <Text fontWeight={800} fontSize="20px" as="span">
                    {item?.contextName}
                  </Text>{' '}
                  : {item?.recommendation}
                </Text>
              ))}
            </VStack>
          </AIContainer>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

export default PredictiveMaintenance;
