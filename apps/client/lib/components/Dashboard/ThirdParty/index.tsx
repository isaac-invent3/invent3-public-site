import { Flex, Grid, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';
import SectionOne from './SectionOne';
import CompanyList from './CompanyList';
import UserActivityTable from '../Common/Table/UserActivity';
import CompanyLocation from './CompanyLocation';

const ThirdParty = () => {
  return (
    <Flex width="full" direction="column" pb="24px" gap="24px">
      <Header />
      <VStack width="full" spacing="16px" px={{ base: '16px', md: 0 }}>
        <SectionOne />
        <CompanyList />
        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)' }}
          gap="16px"
          width="full"
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <SimpleGrid columns={1} width="full" height="full">
              <UserActivityTable />
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={{ base: 1 }}>
            <CompanyLocation />
          </GridItem>
        </Grid>
      </VStack>
    </Flex>
  );
};

export default ThirdParty;
