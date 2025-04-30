import React from 'react';
import InfoCard from '../../../InfoCard';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useGetBMSHvacSystemStatusQuery } from '~/lib/redux/services/dashboard/bms.services';

const Control = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSHvacSystemStatusQuery(
    { facilityId: id },
    { skip: !id }
  );
  return (
    <InfoCard
      title="Envrionmental Control"
      containerStyle={{
        height: 'full',
        spacing: '40px',
      }}
    >
      <HStack width="full" justifyContent="space-between">
        <VStack spacing="26px" alignItems="flex-start">
          <Text
            color="#07CC3B"
            fontSize="40px"
            lineHeight="100%"
            fontWeight={800}
          >
            {data?.data?.operationalEfficency ?? '-'}%
          </Text>
          <Text fontWeight={800} fontSize="16px" lineHeight="100%">
            CO₂ Levels
          </Text>
        </VStack>
        <VStack spacing="26px" alignItems="flex-start">
          <VStack spacing="8px">
            <Text color="neutral.600" fontSize="16px" lineHeight="24px">
              Humidity
            </Text>
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              {data?.data?.humiditySetPoint?.value ?? '-'}
              {data?.data?.humiditySetPoint?.key ?? '-'}
            </Text>
          </VStack>
          <Text fontWeight={800} fontSize="16px" lineHeight="100%">
            {data?.data?.energyConsumption?.value ?? '-'}
            {data?.data?.energyConsumption?.key ?? '-'}
          </Text>
        </VStack>
      </HStack>
    </InfoCard>
  );
};

export default Control;
