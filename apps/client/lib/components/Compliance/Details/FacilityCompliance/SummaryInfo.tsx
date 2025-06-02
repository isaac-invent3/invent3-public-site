import { Flex, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { FacilityAssetComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';

const SummaryInfo = ({ data }: { data: FacilityAssetComplianceSummary }) => {
  const facilityInfo = [
    {
      label: 'Asset Category',
      value: data?.assetCategories?.toLocaleString() ?? '-',
    },
    {
      label: 'Compliance',
      value: data?.compliantItems?.toLocaleString() ?? '-',
    },
    {
      label: 'Asset',
      value: data?.totalAssets?.toLocaleString() ?? '-',
    },
  ];
  return (
    <Stack
      minH="179px"
      height="full"
      pb="16px"
      bgColor="primary.500"
      width={{ base: 'full', lg: 'max-content' }}
      rounded="8px"
      spacing={0}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex p="6px">
        <Flex
          position="relative"
          overflow="hidden"
          width={{ base: 'full', lg: '194px' }}
          height={{ base: '170.46px', lg: 'full' }}
          borderTopRadius={{ base: '8px', lg: 'none' }}
          borderLeftRadius={{ base: 'none', lg: '8px' }}
        >
          <Image src="/bms-location-1.png" fill alt="location" />
        </Flex>
      </Flex>
      <VStack spacing="34px" alignItems="flex-start" pt="16px" pl="22px">
        <VStack alignItems="flex-start" spacing="8px">
          <Text
            fontWeight={800}
            fontSize="24px"
            lineHeight="100%"
            color="white"
          >
            {data?.facilityName}
          </Text>
          <Text size="md" lineHeight="100%" color="neutral.200">
            {data?.facilityAddress}
          </Text>
        </VStack>
        <SimpleGrid width="full" columns={{ base: 2, md: 3 }} spacing="24px">
          {facilityInfo.map((item, index) => (
            <VStack alignItems="flex-start" key={index} spacing="8px">
              <Text
                fontWeight={800}
                fontSize="20px"
                lineHeight="100%"
                color="white"
              >
                {item.value}
              </Text>
              <Text lineHeight="100%" color="neutral.250">
                {item.label}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Stack>
  );
};

export default SummaryInfo;
