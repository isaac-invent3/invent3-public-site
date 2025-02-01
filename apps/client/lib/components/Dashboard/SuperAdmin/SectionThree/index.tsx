import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CompanyManagement from './CompanyManagement';
import UserActivity from '../../ClientAdmin/SectionFive/UserActivity';

const SectionThree = () => {
  return (
    <SimpleGrid spacing="16px" width="full" minH="409px" columns={2}>
      <CompanyManagement />
      <UserActivity />
    </SimpleGrid>
  );
};

export default SectionThree;
