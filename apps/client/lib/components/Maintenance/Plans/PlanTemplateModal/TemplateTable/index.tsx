import { Icon } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import DataTable from '~/lib/components/UI/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { ChevronRightIcon } from '~/lib/components/CustomIcons';

interface TemplateTableProps {
  isLoading: boolean;
  isFetching: boolean;
  data: MaintenancePlan[];
  setSelectedPlan: React.Dispatch<React.SetStateAction<MaintenancePlan | null>>;
}

const TemplateTable = (props: TemplateTableProps) => {
  const { isLoading, isFetching, data, setSelectedPlan } = props;

  const columnHelper = createColumnHelper<MaintenancePlan>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('maintenancePlanId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('planName', {
          cell: (info) => info.getValue(),
          header: 'Template name',
          enableSorting: false,
        }),
        columnHelper.accessor('activeSchedules', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Total Schedule',
          enableSorting: false,
        }),
        columnHelper.accessor('openTasks', {
          cell: (info) => info.getValue(),
          header: 'Total Tasks',
          enableSorting: false,
        }),

        columnHelper.accessor('owner', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Created by',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Completion Date',
          enableSorting: false,
        }),

        columnHelper.accessor('planTypeId', {
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
      handleSelectRow={(value) => setSelectedPlan(value)}
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
