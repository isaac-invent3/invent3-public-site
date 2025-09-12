import { ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';

const SuggestedActions = () => {
  const content = [
    'Inspect bearings and lubrication.',
    'Check cooling system airflow.',
    'Prepare spare fan unit for replacement.',
  ];
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <Text color="neutral.600" fontWeight={700}>
        Suggested Actions
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

export default SuggestedActions;
