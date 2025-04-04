import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { Company } from '~/lib/interfaces/company.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { DataTable } from '@repo/ui/components';
import Technician from '../../AssetManagement/Common/Technician';
import { useSession } from 'next-auth/react';
import {
  useGetAllScheduleInstanceQuery,
  useSearchScheduleInstanceMutation,
} from '~/lib/redux/services/maintenance/scheduleInstance.services';
import {
  MaintenanceSchedule,
  MaintenanceScheduleInstance,
} from '~/lib/interfaces/maintenance.interfaces';
import Status from '~/lib/components/AssetManagement/Common/MaintenanceStatus';
import MaintenanceScheduleDrawer from '../../Maintenance/Schedules/Timeline/MaintenanceScheduleDrawer';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

const ContentDisplay = (
  content: string | React.ReactNode,
  color: string,
  maxW?: string
) => {
  return (
    <Text
      height="full"
      whiteSpace="normal"
      noOfLines={3}
      textOverflow="ellipsis"
      width={maxW ?? 'full'}
      {...(maxW ? { maxW } : {})}
      color={color}
    >
      {content}
    </Text>
  );
};

interface useUpcomingMaintenanceTable {
  search?: string;
  customPageSize?: number;
  perUser?: boolean;
  showFooter?: boolean;
}

const useUpcomingMaintenanceTable = (props: useUpcomingMaintenanceTable) => {
  const { search, customPageSize, perUser, showFooter } = props;
  const session = useSession();
  const user = session?.data?.user;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { clearSearchParamsAfter, getSearchParam, updateSearchParam } =
    useCustomSearchParams();
  const { data, isLoading, isFetching } = useGetAllScheduleInstanceQuery({
    pageSize: customPageSize ?? pageSize,
    pageNumber,
    ...(perUser ? { assignedTo: user?.userId! } : {}),
  });
  const maintenanceScheduleInstanceId = getSearchParam(
    SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug
  );

  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<MaintenanceScheduleInstance>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchScheduleInstance, { isLoading: searchLoading }] =
    useSearchScheduleInstanceMutation({});

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'scheduleInstanceName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(
      searchScheduleInstance,
      searchCriterion,
      ''
    );
    setSearchData(response?.data);
  }, [searchScheduleInstance, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  useEffect(() => {
    if (maintenanceScheduleInstanceId) {
      onOpen();
    }
  }, [maintenanceScheduleInstanceId]);

  const columnHelper = createColumnHelper<MaintenanceScheduleInstance>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('scheduledDate', {
        cell: (info) => {
          const value = info.getValue();
          if (value && !isNaN(new Date(value).getTime())) {
            return ContentDisplay(
              info.getValue() ? dateFormatter(value, 'D MMM, YYYY') : 'N/A',
              'neutral.600',
              '74px'
            );
          } else {
            return 'N/A';
          }
        },
        header: 'Date',
        enableSorting: false,
      }),
      columnHelper.accessor('assetName', {
        cell: (info) => ContentDisplay(info.getValue(), 'black', '100px'),
        header: 'Asset',
        enableSorting: false,
      }),
      columnHelper.accessor('scheduleInstanceName', {
        cell: (info) => ContentDisplay(info.getValue(), 'black', '128px'),
        header: 'Name',
        enableSorting: false,
      }),
      columnHelper.accessor('contactPerson', {
        cell: (info) =>
          !info.row.original.contactPerson &&
          !info.row.original.contactPersonEmail &&
          !info.row.original.contactPersonPhoneNo
            ? 'N/A'
            : Technician(info.row.original),
        header: 'Contact Person',
        enableSorting: false,
      }),
      columnHelper.accessor('maintenanceType', {
        cell: (info) => ContentDisplay(info.getValue(), 'neutral.600', '77px'),
        header: 'Type',
        enableSorting: false,
      }),
      columnHelper.accessor('currentStatus', {
        cell: (info) =>
          info.getValue() ? Status(info.getValue() as string) : 'N/A',
        header: 'Status',
        enableSorting: false,
      }),
    ],
    [data?.data?.items] //eslint-disable-line
  );

  const UpcomingMaintenanceTable = (
    <>
      <Flex width="full" direction="column">
        <DataTable
          columns={columns}
          data={
            search && searchData
              ? searchData?.data?.items
              : (data?.data?.items ?? [])
          }
          isLoading={isLoading || searchLoading}
          isFetching={isFetching}
          showFooter={showFooter}
          maxTdWidth="200px"
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
          }}
          handleSelectRow={(row) => {
            if (row) {
              updateSearchParam(
                SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
                row.scheduleInstanceId
              );
            }
          }}
        />
      </Flex>

      <MaintenanceScheduleDrawer
        isOpen={isOpen}
        onClose={() => {
          clearSearchParamsAfter(
            SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug,
            { removeSelf: true }
          );
          onClose();
        }}
        scheduleInstanceId={
          maintenanceScheduleInstanceId ? +maintenanceScheduleInstanceId : null
        }
      />
    </>
  );
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    handleSearch,
    UpcomingMaintenanceTable,
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : (data?.data?.totalPages ?? 0),

    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useUpcomingMaintenanceTable;
