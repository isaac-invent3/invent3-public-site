import { Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ChangeLog {
  field: string;
  beforeChange: string;
  afterChange: string;
}

const changeLog: ChangeLog[] = [
  {
    field: 'Vendor Name',
    beforeChange: 'Tech Solutions Ltd',
    afterChange: 'Tech Supplies',
  },
  {
    field: 'Contact Person',
    beforeChange: 'John Doe',
    afterChange: 'Jane Smith',
  },
  {
    field: 'Email',
    beforeChange: 'support@techsolutions.com',
    afterChange: 'contact@techsupplies.com',
  },
  {
    field: 'Phone Number',
    beforeChange: '+1 123-456-7890',
    afterChange: '+1 987-654-3210',
  },
  {
    field: 'Address',
    beforeChange: '123 Tech Street, NY',
    afterChange: '456 Supply Road, CA',
  },
];

const ChangedData = () => {
  const columnHelper = createColumnHelper<ChangeLog>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('field', {
          cell: (info) => info.getValue(),
          header: 'Field',
          enableSorting: false,
        }),

        columnHelper.accessor('beforeChange', {
          cell: (info) => info.getValue(),
          header: 'Before Change',
          enableSorting: true,
        }),

        columnHelper.accessor('afterChange', {
          cell: (info) => info.getValue(),
          header: 'After Change',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[changeLog]] //eslint-disable-line
  );

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Text size="md" fontWeight={700} color="primary.500">
        Data Changed
      </Text>
      <DataTable
        columns={columns}
        data={changeLog}
        isLoading={false}
        isFetching={false}
        showFooter={false}
        maxTdWidth="200px"
        customThStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontWeight: 700,
        }}
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </VStack>
  );
};

export default ChangedData;
