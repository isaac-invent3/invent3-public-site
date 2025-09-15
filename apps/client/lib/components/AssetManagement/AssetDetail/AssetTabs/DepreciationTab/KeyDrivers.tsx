import { ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';

const KeyDrivers = () => {
  const content = [
    'Health Score < 40%',
    'Warranty Expired',
    'Maintenance Frequency Increasing',
  ];
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <Text color="neutral.600" size="md">
        Key Drivers:
      </Text>
      <UnorderedList
        spacing="8px"
        width="full"
        alignItems="flex-start"
        pl="8px"
      >
        {content.map((item, index) => (
          <ListItem
            key={index}
            color="black"
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

export default KeyDrivers;
