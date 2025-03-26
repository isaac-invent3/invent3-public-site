import { Flex, HStack, Text } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import {
  ApprovalWorkflowRequest,
  ApprovalWorkflowType,
} from '~/lib/interfaces/approvalWorkflow.interfaces';
import { useGetAllApprovalWorkflowRequestsQuery } from '~/lib/redux/services/approval-workflow/requests.services';
import {
  COLOR_CODES_FALLBACK,
  DEFAULT_PAGE_SIZE,
  ROUTES,
} from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

interface ApprovalTableProps {
  selectedApprovalType: ApprovalWorkflowType | null;
}

const ApprovalTable = (props: ApprovalTableProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedApprovalType } = props;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading, isFetching } =
    useGetAllApprovalWorkflowRequestsQuery({
      pageNumber: currentPage,
      pageSize: pageSize,
      approvalTypeId: selectedApprovalType?.approvalTypeId ?? undefined,
    });

  const columnHelper = createColumnHelper<ApprovalWorkflowRequest>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('approvalRequestId', {
          cell: (info) => info.getValue(),
          header: 'ID',
          enableSorting: false,
        }),

        columnHelper.accessor('requestedByUserFirstName', {
          cell: (info) => {
            const approvalRequest = info.row.original;

            return (
              <UserInfo
                name={`${approvalRequest.requestedByUserFirstName} ${approvalRequest.requestedByUserLastName}`}
              />
            );
          },
          header: 'Requestor',
          enableSorting: true,
        }),
        columnHelper.accessor('approvalTypeName', {
          cell: (info) => (
            <Text fontWeight={800} color="black">
              {info.getValue()}
            </Text>
          ),
          header: 'Approval Type',
          enableSorting: false,
        }),

        columnHelper.accessor('numberOfApprovalLevels', {
          cell: (info) => info.getValue(),
          header: 'No of Approval Level',
          enableSorting: false,
        }),

        columnHelper.accessor('dateRequested', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Date Requested',
          enableSorting: false,
        }),

        columnHelper.accessor('currentStatusName', {
          cell: (info) => {
            const request = info.row.original;
            return (
              <>
                <HStack>
                  <Text>
                    {' '}
                    Level {request.currentLevel ? request.currentLevel : 1}
                  </Text>{' '}
                  <Text>/</Text>
                  <UserInfo name={request.requestedByUserFirstName} />
                </HStack>
              </>
            );
          },
          header: 'Current Level / Pending With',
          enableSorting: false,
        }),

        columnHelper.accessor('currentStatusName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                colorCode={COLOR_CODES_FALLBACK.default}
                width="100px"
                text={info.getValue()}
              />
            );
          },
          header: 'Status',
        }),

        columnHelper.accessor('approvalTypeId', {
          cell: () => <PopoverAction />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex width="full" mt="24px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectRow={(row) => {
          router.push(`/${ROUTES.APPROVAL}/${row.approvalRequestId}`);
        }}
        emptyLines={15}
        isSelectable
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
    </Flex>
  );
};

export default ApprovalTable;
