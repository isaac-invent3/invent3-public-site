import {
  Flex,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';
import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import CompanyList from './CompanyList';
import UserActivityTable from '../Common/Table/UserActivity';
import CompanyLocation from './CompanyLocation';

const ThirdParty = () => {
  return (
    <Flex width="full" direction="column" pb="24px" gap="24px">
      <Header>
        <Button
          customStyles={{
            width: '184px',
            height: { base: '36px', md: 'min-content' },
            alignSelf: 'end',
          }}
          href={`/${ROUTES.COMPANY}/add`}
        >
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add New Company
        </Button>
      </Header>
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
