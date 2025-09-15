import { ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import DetailHeader from '~/lib/components/UI/DetailHeader';

const DriversAffectingPrediction = () => {
  const content = [
    {
      label: 'Heat:',
      value: '85°C (above threshold)',
    },
    {
      label: 'Vibration:',
      value: '3.2 mm/s (abnormal)',
    },
    {
      label: 'Usage Hours:',
      value: '4,500 hrs (near end of life)',
    },
  ];

  return (
    <VStack width="full" spacing="12px" alignItems="flex-start">
      <DetailHeader variant="secondary">
        Top Drivers Affecting Prediction
      </DetailHeader>

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
            <Detail
              {...item}
              labelMinWidth="90px"
              labelStyle={{ color: 'black' }}
            />
          </ListItem>
        ))}
      </UnorderedList>
      <Text color="blue.500" mt="18px">
        View Detailed Breakdown
      </Text>
    </VStack>
  );
};

export default DriversAffectingPrediction;
