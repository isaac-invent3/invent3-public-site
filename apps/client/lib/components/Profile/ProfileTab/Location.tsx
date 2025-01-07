import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import EditButton from '../Common/EditButton';
import { useSession } from 'next-auth/react';
import Detail from './Detail';

const Location = () => {
  const data = useSession();
  const user = data?.data?.user;
  const infoOne = [
    {
      label: 'Country',
      value: user?.firstName,
    },
    {
      label: 'City/State',
      value: user?.lastName,
    },
    {
      label: 'Postal/Zip Code',
      value: user?.email,
    },
  ];

  const infoTwo = [
    {
      label: 'Region',
      value: user?.firstName,
    },
    {
      label: 'Area',
      value: user?.lastName,
    },
    {
      label: 'Location',
      value: user?.email,
    },
  ];
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text size="xl" color="primary.500" fontWeight={700}>
        Location
      </Text>
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <VStack spacing="22px" width="60%" alignItems="flex-start">
          <Grid templateColumns="repeat(3, 1fr)" gap="66px" width="full">
            {infoOne.map((item, index) => (
              <GridItem colSpan={1} width="full" key={index}>
                <Detail {...item} />
              </GridItem>
            ))}
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap="66px" width="full">
            {infoTwo.map((item, index) => (
              <GridItem colSpan={1} width="full" key={index}>
                <Detail {...item} />
              </GridItem>
            ))}
          </Grid>
        </VStack>
        <EditButton />
      </HStack>
    </VStack>
  );
};

export default Location;
