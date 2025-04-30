import React from 'react';
import InfoCard from '../../../InfoCard';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useGetBMSDensityMetricsQuery } from '~/lib/redux/services/dashboard/bms.services';

const DensityMetrics = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSDensityMetricsQuery(
    { facilityId: id },
    { skip: !id }
  );
  return (
    <InfoCard
      title="Density Metrics"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <Flex
        width="205px"
        height="205px"
        rounded="full"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {/* Outer circle with neutral background */}
        <Box
          width="205px"
          height="205px"
          rounded="full"
          bg="#E0E0E0"
          position="absolute"
        />

        {/* Gradient progress ring */}
        <Box
          width="205px"
          height="205px"
          rounded="full"
          position="absolute"
          // bg={`conic-gradient(rgba(23, 161, 250, 0.5) ${progress}%, #E0E0E0 ${progress}%)`}
          bg={`conic-gradient(
              #033376 ${data?.data?.metric?.value ?? 0}%,
              #E0E0E0 ${data?.data?.metric?.value ?? 0}%
            )`}
        />

        {/* Inner circle to create ring appearance */}
        <Flex
          width="120px"
          height="120px"
          rounded="full"
          bg="#F2F1F1"
          zIndex={1}
          justifyContent="center"
          alignItems="center"
        >
          <VStack spacing="2px">
            <Text fontWeight={600} fontSize="24px" lineHeight="100%">
              {data?.data?.metric?.value ?? '-'}
            </Text>
            <Text color="neutral.600">g/cm</Text>
          </VStack>
        </Flex>
      </Flex>
    </InfoCard>
  );
};

export default DensityMetrics;
