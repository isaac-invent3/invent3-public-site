import React from 'react';
import Header from '../Header';
import { Flex, VStack } from '@chakra-ui/react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import RecentApprovalRequest from './RecentApprovalRequest';
import SectionFive from './SectionFive';
import Filter from '../Header/Filter';

const ClientAdmin = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header>
        <Filter />
      </Header>
      <VStack width="full" mt="32px" spacing="16px">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <RecentApprovalRequest />
        <SectionFive />
      </VStack>
    </Flex>
  );
};

export default ClientAdmin;
