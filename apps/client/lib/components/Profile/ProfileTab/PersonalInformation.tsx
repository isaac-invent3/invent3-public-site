import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
// import EditButton from '../Common/EditButton';
import { useSession } from 'next-auth/react';
import Detail from './Detail';
import { User } from '~/lib/interfaces/user.interfaces';

interface PersonalInformationProps {
  user: User | undefined;
  isLoading: boolean;
}

const PersonalInformation = ({
  user: LoadedUser,
  isLoading,
}: PersonalInformationProps) => {
  const data = useSession();
  const user = data?.data?.user;
  const infoOne = [
    {
      label: 'First Name',
      value: user?.firstName,
    },
    {
      label: 'Last Name',
      value: user?.lastName,
    },
    {
      label: 'Email Address',
      value: user?.email,
    },
  ];
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <Text
        size={{ base: 'lg', md: 'xl' }}
        color="primary.500"
        fontWeight={700}
      >
        Personal Information
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
                <Detail {...item} />
              </GridItem>
            ))}
          </Grid>
          <Grid
            templateColumns={{ sm: 'repeat(3, 1fr)' }}
            gap={{ base: '16px', md: '66px' }}
            width="full"
          >
            <GridItem colSpan={1} width="full">
              <Detail
                label="Phone Number"
                value={LoadedUser?.phoneNumber}
                isLoading={isLoading}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <VStack width="full" alignItems="flex-start" spacing="8px">
                <Text color="neutral.600">Bio</Text>
                <Text color="neutral.700">N/A</Text>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
        {/* <EditButton /> */}
      </HStack>
    </VStack>
  );
};

export default PersonalInformation;
