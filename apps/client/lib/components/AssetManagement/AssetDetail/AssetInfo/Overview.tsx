import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import AssetStatus from '../../AssetStatus';
import { DetailContent } from '../DetailContent';

interface OverviewProps {
  data: Asset;
}
const Overview = ({ data }: OverviewProps) => {
  const assetInfo = [
    {
      label: 'Make',
      value: 'Dell',
    },
    {
      label: 'Model',
      value: 'Latitude 360',
    },
    {
      label: 'Serial Number',
      value: 'A23570720495730',
    },
  ];
  return (
    <HStack
      width="full"
      py="24px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="16px"
      alignItems="flex-start"
    >
      <Flex height="149px" width="184px" rounded="16px" bgColor="white" />
      <VStack alignItems="flex-start" width="full" spacing="24px">
        <HStack spacing="16px">
          <Heading
            as="h3"
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
          >
            {data.assetName}
          </Heading>
          <AssetStatus color="#07CC3B" label="In Use" />
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px">
              <DetailContent
                color="neutral.600"
                customStyles={{ width: '92px', fontWeight: 800 }}
              >
                Asset ID
              </DetailContent>
              <DetailContent customStyles={{ fontWeight: 800 }}>
                {data.assetId}
              </DetailContent>
            </HStack>
            <HStack spacing="8px">
              <DetailContent
                color="neutral.600"
                customStyles={{ width: '92px', fontWeight: 800 }}
              >
                Category
              </DetailContent>
              <DetailContent customStyles={{ fontWeight: 800 }}>
                {data.categoryId}
              </DetailContent>
            </HStack>
            {assetInfo.map((info) => (
              <HStack spacing="8px">
                <DetailContent
                  color="neutral.600"
                  customStyles={{ width: '92px' }}
                >
                  {info.label}
                </DetailContent>
                <DetailContent>{info.value}</DetailContent>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="7px">
            <Text
              fontSize="14px"
              lineHeight="16.63px"
              fontWeight={500}
              color="black"
            >
              Barcode:
            </Text>
            <Flex bgColor="white" height="89px" width="185px" />
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;
