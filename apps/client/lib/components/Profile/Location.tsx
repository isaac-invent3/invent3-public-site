import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
// import EditButton from '../Common/EditButton';
import Detail from './Detail';
import { User } from '~/lib/interfaces/user.interfaces';

interface LocationProps {
  user: User | undefined;
  isLoading: boolean;
}

const Location = ({ user, isLoading }: LocationProps) => {
  const infoOne = [
    {
      label: 'City/State',
      value: user?.stateName,
    },
    {
      label: 'LGA',
      value: user?.lganame,
    },
    {
      label: 'Postal/Zip Code',
      value: 'N/A',
    },
  ];

  const infoTwo = [
    {
      label: 'Region',
      value: user?.stateName,
    },
    {
      label: 'Area',
      value: user?.lganame,
    },
    {
      label: 'Location',
      value: user?.address,
    },
  ];
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text size="lg" color="primary.500" fontWeight={700}>
        Location
      </Text>
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <VStack
          spacing="22px"
          width={{ base: 'full', lg: '60%' }}
          alignItems="flex-start"
        >
          <Grid
            templateColumns={{ sm: 'repeat(3, 1fr)' }}
            gap={{ base: '16px', md: '66px' }}
            width="full"
          >
            {infoOne.map((item, index) => (
              <GridItem colSpan={1} width="full" key={index}>
                <Detail {...item} isLoading={isLoading} />
              </GridItem>
            ))}
          </Grid>
          <Grid
            templateColumns={{ sm: 'repeat(3, 1fr)' }}
            gap={{ base: '16px', md: '66px' }}
            width="full"
          >
            {infoTwo.map((item, index) => (
              <GridItem colSpan={1} width="full" key={index}>
                <Detail {...item} isLoading={isLoading} />
              </GridItem>
            ))}
          </Grid>
        </VStack>
        {/* <EditButton /> */}
      </HStack>
    </VStack>
  );
};

export default Location;
