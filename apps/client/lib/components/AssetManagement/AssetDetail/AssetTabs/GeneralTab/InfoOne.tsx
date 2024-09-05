import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { DetailContent } from '../../DetailContent';
import DetailHeader from '../../DetailHeader';

const InfoOne = () => {
  const details = [
    {
      label: 'Location:',
      value: 'Lekki Branch, Building A, Floor 3, IT Room, Aisle 5, Shelve 3',
    },
    {
      label: 'Asset Code:',
      value: 'Latitude 360',
    },
    {
      label: 'Weight:',
      value: 'A23570720495730',
    },
    {
      label: 'Length:',
      value: 'Latitude 360',
    },
    {
      label: 'Width:',
      value: 'Latitude 360',
    },
    {
      label: 'Height::',
      value: 'Latitude 360',
    },
  ];

  return (
    <SimpleGrid
      columns={2}
      width="full"
      gap="74px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" spacing="8px">
        {details.map((item) => (
          <HStack spacing="8px" alignItems="flex-start">
            <DetailContent
              customStyles={{
                minW: '77px',
                color: 'neutral.600',
              }}
            >
              {item.label}
            </DetailContent>
            <DetailContent customStyles={{ minW: '221px' }}>
              {item.value}
            </DetailContent>
          </HStack>
        ))}
      </VStack>
      <VStack alignItems="flex-start">
        <DetailHeader>Description:</DetailHeader>
        <Text
          fontSize="14px"
          lineHeight="16.63px"
          color="neutral.800"
          fontWeight={400}
        >
          Lorem ipsum dolor sit amet consectetur. Maecenas iaculis diam et at
          imperdiet massa dignissim. Faucibus odio fermentum imperdiet ac enim
          imperdiet sit integer. Diam felis mattis elit fusce dignissim at felis
          in neque. Condimentum diam vestibulum ipsum purus tristique feugiat
          integer. Enim est vitae amet libero vitae tristique consequat non.
          Eget donec eu congue velit.
        </Text>
      </VStack>
    </SimpleGrid>
  );
};

export default InfoOne;
