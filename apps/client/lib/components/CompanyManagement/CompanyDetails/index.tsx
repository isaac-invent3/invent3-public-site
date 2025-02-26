'use client';
import { Flex } from '@chakra-ui/react';
import CompanyInfo from './CompanyInfo';
import Header from './Header';
import CompanySubInfo from './CompanySubInfo';

const CompanyDetails = () => {
  return (
    <Flex
      width="full"
      direction="column"
      pb={{ md: '24px' }}
      px={{ base: '16px', md: 0 }}
      gap={{ base: '16px', md: '32px' }}
    >
      <Header />
      <CompanyInfo />
      <CompanySubInfo />
    </Flex>
  );
};

export default CompanyDetails;
