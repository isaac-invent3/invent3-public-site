import { Icon } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { ChevronRightIcon } from '~/lib/components/CustomIcons';
import { Template } from '~/lib/interfaces/template.interfaces';

interface TemplateTableProps {
  isLoading: boolean;
  isFetching: boolean;
  data: Template[];
  setSelectedTemplate: React.Dispatch<React.SetStateAction<Template | null>>;
}

const TemplateTable = (props: TemplateTableProps) => {
  const { isLoading, isFetching, data, setSelectedTemplate } = props;

  const columnHelper = createColumnHelper<Template>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('templateId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('templateName', {
          cell: (info) => info.getValue(),
          header: 'Template Name',
          enableSorting: false,
        }),
        columnHelper.accessor('description', {
          cell: (info) => info.getValue(),
          header: 'Template Description',
          enableSorting: false,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),

        columnHelper.accessor('guid', {
          cell: () => {
            return (
              <Icon as={ChevronRightIcon} boxSize="16px" color="neutral.800" />
            );
          },
          header: '',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      showFooter={false}
      emptyLines={3}
      isSelectable={false}
      hideSelectAllCheckBox={true}
      isLoading={isLoading}
      isFetching={isFetching}
      selectMultipleRows={false}
      handleSelectRow={(value) => setSelectedTemplate(value)}
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
      customTableContainerStyle={{ rounded: 'none' }}
    />
  );
};

export default TemplateTable;
