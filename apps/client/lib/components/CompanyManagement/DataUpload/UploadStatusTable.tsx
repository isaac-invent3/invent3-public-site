import { TableContainerProps } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

interface CustomTableProps {
  headers: string[];
  data: React.ReactNode[][];
  customTableContainerStyle?: TableContainerProps;
}

const UploadStatusTable: React.FC<CustomTableProps> = ({
  headers,
  data,
  customTableContainerStyle,
}) => {
  const convertedRows = data.map((row) => {
    const obj: { [key: string]: React.ReactNode } = {};
    headers.forEach((header, i) => {
      obj[`col-${i}`] = row[i];
    });
    return obj;
  });

  const columnHelper = createColumnHelper<{ [key: string]: React.ReactNode }>();

  const columns = headers.map((header, i) =>
    columnHelper.accessor(`col-${i}`, {
      header,
      cell: (info) => info.getValue(),
      enableSorting: false,
    })
  );

  return (
    <DataTable
      columns={columns}
      data={convertedRows ?? []}
      showFooter={false}
      emptyLines={3}
      maxTdWidth="250px"
      customThStyle={{
        paddingLeft: '16px',
        paddingTop: '17px',
        paddingBottom: '17px',
        fontWeight: 700,
        bgColor: '#B4BFCA',
      }}
      customTdStyle={{
        paddingLeft: '16px',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
      customTBodyRowStyle={{ verticalAlign: 'top' }}
      customTableContainerStyle={{
        rounded: '4px',
        ...customTableContainerStyle,
      }}
    />
  );
};

export default UploadStatusTable;
