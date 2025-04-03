import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../Common/CardHeader';
import CompanyTable from '~/lib/components/CompanyManagement/Table/CompanyTable';
import CompanyModal from '../Modals/CompanyModal';
import useCompanyTable from '../../CompanyManagement/Table/useCompanyTable';

const CompanyList = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { CompanyInfoTable } = useCompanyTable({
    customPageSize: 5,
    showFooter: false,
    emptyLine: 5,
  });
  return (
    <>
      <VStack
        width="full"
        height="full"
        minH="350px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
      >
        <HStack width="full" justifyContent="space-between" pl="16px" pr="15px">
          <HStack>
            <CardHeader>List of Companies</CardHeader>
            <Text
              color="neutral.800"
              py="6px"
              px="8px"
              rounded="4px"
              bgColor="neutral.200"
            >
              Today
            </Text>
          </HStack>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: '68px',
              fontSize: '12px',
              lineHeight: '14.26px',
            }}
          >
            View All
          </Button>
        </HStack>
        {CompanyInfoTable}
      </VStack>
      {isOpen && <CompanyModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default CompanyList;
