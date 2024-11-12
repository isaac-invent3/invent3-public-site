import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import TemplateRow from './TemplateRow';

interface TemplateTableProps {
  isLoading: boolean;
  isFetching: boolean;
  data: MaintenancePlan[];
}

const tableHeadings = [
  '#',
  'Template Name',
  'Total Schedules',
  'Total Tasks',
  'Created By',
  'Date Created',
  '',
];

const TemplateTable = (props: TemplateTableProps) => {
  const { isLoading, isFetching, data } = props;
  return (
    <TableContainer overflowY="auto" bgColor="white" rounded="4px">
      <Table>
        <Thead bgColor="#B4BFCA80">
          {tableHeadings.map((item, index) => (
            <Th
              py="17px"
              pl="16px"
              textTransform="capitalize"
              fontSize="12px"
              lineHeight="14.26px"
              fontWeight={500}
              color="black"
              key={index}
              bgColor="#B4BFCA80"
            >
              {item}
            </Th>
          ))}
        </Thead>
        <Tbody
          opacity={!isLoading && isFetching ? 0.5 : 1}
          overflow="auto"
          width="full"
        >
          {isLoading
            ? Array(5)
                .fill('')
                .map((_, index) => (
                  <Tr key={index}>
                    {tableHeadings.map((_, idx) => (
                      <Td
                        key={idx}
                        borderColor="neutral.300"
                        py="16px"
                        px="16px"
                      >
                        <Skeleton height="15px" width="50%" maxW="100px" />
                      </Td>
                    ))}
                  </Tr>
                ))
            : data.map((item, index) => (
                <TemplateRow plan={item} key={index} />
              ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TemplateTable;
