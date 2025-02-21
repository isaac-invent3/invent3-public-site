import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../Common/CardHeader';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useGetAllCompaniesQuery } from '~/lib/redux/services/company.services';
import { GenericPopover } from '@repo/ui/components';
import CompanyTable from '~/lib/components/CompanyManagement/Table/CompanyTable';

const PopoverAction = (company: Company) => {
  return (
    <GenericPopover width="129px" placement="bottom-start">
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <Text
          cursor="pointer"
          as="a"
          href={`/${ROUTES.COMPANY}/${company.companyId}/detail`}
        >
          View Company Details
        </Text>
      </VStack>
    </GenericPopover>
  );
};

const CompanyList = () => {
  const { data, isLoading } = useGetAllCompaniesQuery({ pageSize: 10 });
  return (
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
          href={`/${ROUTES.COMPANY}`}
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
      <Flex width="full">
        <CompanyTable
          data={data}
          isLoading={isLoading}
          showFooter={false}
          showPopover
          PopoverComponent={PopoverAction}
        />
      </Flex>
    </VStack>
  );
};

export default CompanyList;
