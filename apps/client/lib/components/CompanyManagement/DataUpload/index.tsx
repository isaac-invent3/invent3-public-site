'use client';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import DataUpload from './DataUpload';
import DocumentUpload from './DocumentUpload';

const CompanyUpload = () => {
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

  return (
    <Flex
      width="full"
      direction="column"
      pb={{ md: '24px' }}
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Data Upload</PageHeader>
      <Tabs
        variant="custom"
        width={'full'}
        onChange={(index) => setTabIndex(index)}
        index={tabIndex}
        mt="41px"
      >
        <TabList>
          <Tab>Data Upload</Tab>
          <Tab>Document Upload</Tab>
        </TabList>

        <Box
          width="full"
          bgColor="white"
          pt={{ base: '24px' }}
          px="16px"
          pb={{ base: '16px', lg: '40px' }}
          rounded="6px"
          minH="60vh"
          mt="16px"
        >
          <TabPanels>
            <TabPanel>
              <VStack
                width="full"
                alignItems="flex-start"
                spacing={{ base: '32px', lg: '40px' }}
              >
                <DataUpload />
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack
                width="full"
                alignItems="flex-start"
                spacing={{ base: '32px', lg: '40px' }}
              >
                <DocumentUpload />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Flex>
  );
};

export default CompanyUpload;
