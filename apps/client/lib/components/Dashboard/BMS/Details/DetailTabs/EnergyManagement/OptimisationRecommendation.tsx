import React from 'react';
import AIContainer from '../../../Common/AIContainer';
import { Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useGetBMSEngeryMgtJarvisRecommendationQuery } from '~/lib/redux/services/dashboard/bms.services';

const OptimisationRecommendation = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSEngeryMgtJarvisRecommendationQuery(
    { facilityId: id },
    { skip: !id }
  );

  return (
    <AIContainer title="Optimisation Recommendation">
      <VStack bgColor="white" spacing="8px" alignItems="flex-start" mt="71px">
        <Text fontWeight={400}>
          <Text fontWeight={800} fontSize="20px" as="span">
            {data?.data?.systemContextType}
          </Text>{' '}
          {data?.data?.recommendation}
        </Text>
      </VStack>
    </AIContainer>
  );
};

export default OptimisationRecommendation;
