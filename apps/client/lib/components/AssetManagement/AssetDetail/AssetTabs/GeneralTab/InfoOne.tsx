import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../DetailHeader';
import DetailSection from '../../DetailSection';

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
        <DetailSection details={details} minWidth="77px" />
      </VStack>
      <VStack alignItems="flex-start">
        <DetailHeader>Description:</DetailHeader>
        <Text size="md" color="neutral.800" fontWeight={400}>
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
