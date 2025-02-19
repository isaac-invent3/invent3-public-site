import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { Company } from '~/lib/interfaces/company.interfaces';
import { useGetAllCompaniesQuery } from '~/lib/redux/services/company.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import { GenericPopover } from '@repo/ui/components';

const PopoverAction = (company: Company) => {
  return (
    <GenericPopover width="129px" placement="bottom-start">
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <Text
          cursor="pointer"
          as="a"
          href={`/${ROUTES.COMPANY}/${company.companyId}/detail`}
        >
          View
        </Text>
        <Text
          cursor="pointer"
          as="a"
          href={`/${ROUTES.COMPANY}/${company.companyId}/edit`}
        >
          Edit
        </Text>
      </VStack>
    </GenericPopover>
  );
};

const CompanyManagement = () => {
  const { data, isLoading } = useGetAllCompaniesQuery({ pageSize: 10 });
  const columnHelper = createColumnHelper<Company>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue(),
          header: 'Company Name',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'DD-MM-YYYY') ?? 'N/A',
          header: 'Registration Date',
          enableSorting: false,
        }),
        columnHelper.accessor('guid', {
          cell: () => 'Active',
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('companyId', {
          cell: () => 'Premium',
          header: 'Subscription Type',
          enableSorting: false,
        }),
        columnHelper.accessor('guid', {
          cell: (info) => {
            return PopoverAction(info.row.original);
          },
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
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
          href={`/${ROUTES.TICKETS}`}
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
        <DataTable
          columns={columns}
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          showFooter={false}
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          maxTdWidth="250px"
        />
      </Flex>
    </VStack>
  );
};

export default CompanyManagement;
