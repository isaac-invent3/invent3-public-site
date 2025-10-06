import { ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';

const InsightsPanel = () => {
  const dataItems = [
    'Lagos HQ lifecycle costs are 37% lower than Abuja Branch.',
    'Kano Office retains the highest residual value (52%), suggesting better asset utilization.',
    'Abuja Branch and Accra Office show highest failure rates (6 & 5 per year), driving higher costs.',
    'If Abuja Branch aligns with Lagos HQ practices, potential savings of ₦7.3M ($8,900) annually are possible.',
    'Port Harcourt Hub performance is mid-range, but trending downward in RUL, requiring monitoring.',
  ];
  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Insights Panel</CardHeader>
      <UnorderedList
        spacing="16px"
        width="full"
        alignItems="flex-start"
        pl="8px"
      >
        {dataItems?.map((item, index) => (
          <ListItem
            key={index}
            color="neutral.600"
            fontSize="14px"
            fontWeight={700}
            lineHeight="100%"
          >
            {item}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
};

export default InsightsPanel;
