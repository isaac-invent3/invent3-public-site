import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const AssetInfo = () => {
  const {
    assetName,
    assetLocation,
    contactPerson,
    contactPersonEmail,
    contactPersonPhoneNo,
  } = useAppSelector((state) => state.maintenance.scheduleForm);
  return (
    <HStack
      width="full"
      bgColor="primary.500"
      px="16px"
      pt="16px"
      pb="47px"
      spacing="32px"
      alignItems="flex-start"
    >
      <VStack spacing="8px" alignItems="flex-start" maxW="236px">
        <Text color="neutral.300">Asset Name</Text>
        <Text size="md" color="white">
          {assetName ?? 'N/A'}
        </Text>
      </VStack>
      <VStack spacing="8px" alignItems="flex-start" maxW="176px">
        <Text color="neutral.300">Asset Location</Text>
        <Text size="md" color="white">
          {assetLocation ?? 'N/A'}
        </Text>
      </VStack>
      <VStack spacing="4px" alignItems="flex-start" maxW="201px">
        <Text color="neutral.300">Engineer/Contact Person</Text>
        {[contactPerson, contactPersonEmail, contactPersonPhoneNo]
          .filter(Boolean)
          .map((detail, index) => (
            <Text size="md" color="white" key={index}>
              {detail}
            </Text>
          ))}
      </VStack>
    </HStack>
  );
};

export default AssetInfo;
