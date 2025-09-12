import {
  Box,
  HStack,
  Icon,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';

const FailureDrivers = () => {
  const content = [
    'Temperature variance exceeded baseline by 25%',
    'Vibration frequency abnormal for 3 days',
    'Energy consumption 15% above expected',
  ];
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <HStack spacing="16px">
        <Text color="neutral.600" fontWeight={700}>
          Failure Drivers
        </Text>
        <Tooltip
          label="Drivers are the top factors influencing this prediction."
          placement="top"
          bgColor="black"
          color="white"
          minW="219px"
          rounded="10px"
          padding="6px"
          fontSize="12px"
        >
          <HStack
            width="12px"
            height="12px"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={InfoIcon} boxSize="12px" color="blue.500" />
          </HStack>
        </Tooltip>
      </HStack>
      <UnorderedList
        spacing="8px"
        width="full"
        alignItems="flex-start"
        pl="8px"
      >
        {content.map((item, index) => (
          <ListItem
            key={index}
            color="neutral.700"
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
          >
            {item}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default FailureDrivers;
