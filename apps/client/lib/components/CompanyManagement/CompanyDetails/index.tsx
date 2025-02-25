'use client';
import { Flex } from '@chakra-ui/react';
import CompanyDetailTabs from './CompanyDetailTabs';
import CompanyInfo from './CompanyInfo';
import Header from './Header';
import CompanySubInfo from './CompanySubInfo';

interface CompanyDetailsProps {
  id: string;
}
const CompanyDetails = (props: CompanyDetailsProps) => {
  return (
    <Flex
      width="full"
      direction="column"
      pb={{ md: '24px' }}
      px={{ base: '16px', md: 0 }}
    >
      <Header />
      <CompanyInfo />
      <CompanySubInfo />

      <CompanyDetailTabs />
    </Flex>
  );
};

export default CompanyDetails;
