import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../../Common/CardHeader';
import CompanyModal from '../../Modals/CompanyModal';
import useCompanyTable from '~/lib/components/CompanyManagement/Table/useCompanyTable';

const CompanyManagement = () => {
  const { CompanyInfoTable } = useCompanyTable({
    customPageSize: 5,
    showFooter: false,
    emptyLine: 5,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <VStack
        width="full"
        height="full"
        minH="350px"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
      >
        <HStack width="full" justifyContent="space-between">
          <HStack>
            <CardHeader>Company/Sign-ups</CardHeader>
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
        <Flex width="full">{CompanyInfoTable}</Flex>
      </VStack>
      {isOpen && <CompanyModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default CompanyManagement;
