import { HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

const Depreciation = () => {
  const details = [
    {
      label: 'Current Net Book Value (NBV):',
      value: '$7,500',
    },
    {
      label: 'Useful Life:',
      value: '3 of 5 years used',
    },
  ];

  return (
    <VStack width="full" spacing="20px">
      <HStack
        fontWeight={500}
        borderBottomWidth="1px"
        borderColor="#BBBBBB80"
        spacing="16px"
        width="full"
        pb="8px"
      >
        <HStack spacing="4px">
          <Text size="md" color="neutral.800">
            Depreciation
          </Text>
          <Tooltip
            label="Depreciation Details"
            placement="top"
            bgColor="#CADBF2"
            color="blue.500"
            width="181px"
            rounded="4px"
            py="8px"
            px="16px"
            fontSize="12px"
          >
            <Icon as={InfoIcon} boxSize="12px" color="blue.500" />
          </Tooltip>
        </HStack>
        <Text
          py="4px"
          px="8px"
          rounded="16px"
          bgColor="neutral.300"
          color="black"
          fontWeight={700}
          fontSize="10px"
          lineHeight="130%"
          width="max-content"
        >
          Straight Line
        </Text>
      </HStack>
      <VStack alignItems="flex-start" spacing="8px" width="full">
        {details.map((item, index) => (
          <Detail {...item} key={index} labelMinWidth="189px" />
        ))}
      </VStack>
    </VStack>
  );
};

export default Depreciation;
