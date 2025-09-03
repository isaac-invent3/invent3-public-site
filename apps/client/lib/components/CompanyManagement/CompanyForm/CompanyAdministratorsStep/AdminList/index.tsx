import { Flex, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { LeaveDialogModal, DataTable } from '@repo/ui/components';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import AddAdminButtonWithErrorMessage from './AddAdminButtonWithErrorMessage';
import { AdminFormDetails } from '~/lib/interfaces/company.interfaces';
import {
  clearSingleAdminForm,
  updateCompanyForm,
  updateSingleAdminForm,
} from '~/lib/redux/slices/CompanySlice';
import ActionPopover from './ActionPopover';

interface AdminListProps {
  type: 'create' | 'edit' | 'list';
  showAdminInfo: boolean;
  setShowAdminInfo: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  selectMultiple: boolean;
}

const AdminList = (props: AdminListProps) => {
  const {
    type,
    showAdminInfo,
    setShowAdminInfo,
    selectedRows,
    setSelectedRows,
    selectMultiple,
  } = props;

  const { admins: allCompanyAdmins } = useAppSelector(
    (state) => state.company.companyForm
  );
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [action, setAction] = useState<'new' | 'update' | null>(null);
  const dispatch = useAppDispatch();
  // const { data, isLoading, isFetching } =
  //   useGetMaintenanceSchedulesByPlanIdQuery(
  //     {
  //       id: planId!,
  //       pageSize,
  //       pageNumber: currentPage,
  //     },
  //     { skip: !planId }
  //   );
  const columnHelper = createColumnHelper<AdminFormDetails>();

  const handleProceedDialogForAddSchedule = () => {
    setAction('new');
    setSelectedRows([]);
    dispatch(clearSingleAdminForm());
    setShowAdminInfo(true);
    onCloseDialog();
  };

  const handleProceedDialogForSelectedRow = (items: number[]) => {
    setSelectedRows(items);
    onCloseDialog();
  };

  const [handleProceed, setHandleProceed] = useState(
    () => handleProceedDialogForAddSchedule
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('contactFirstName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'First Name',
          enableSorting: false,
        }),
        columnHelper.accessor('contactLastName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Surname',
          enableSorting: false,
        }),
        columnHelper.accessor('contactEmail', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Email',
          enableSorting: false,
        }),
        columnHelper.accessor('contactPhoneNumber', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Phone Number',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'actions',
          cell: (info) => ActionPopover(type as 'edit', info.row.original),
          header: '',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[allCompanyAdmins]] //eslint-disable-line
  );

  useEffect(() => {
    if (selectedRows.length >= 1) {
      const admin: AdminFormDetails | undefined =
        allCompanyAdmins[selectedRows?.[0] as number];
      if (admin) {
        dispatch(updateSingleAdminForm(admin));
        setAction('update');
        setShowAdminInfo(true);
      }
    } else if (action === 'update') {
      dispatch(clearSingleAdminForm());
      setShowAdminInfo(false);
    }
  }, [selectedRows]);

  // Clear selectedRows if showSchedule Info is changed to false
  useEffect(() => {
    if (!showAdminInfo) {
      setSelectedRows([]);
    }
  }, [showAdminInfo]);

  const formattedAdmins: AdminFormDetails[] = useMemo(() => {
    // if (data?.data && data?.data?.items?.length >= 1) {
    //   const admins: AdminFormDetails[] = data.data.items;
    //   return admins.map((item) => ({
    //     contactId: item.contactId,
    //     localId: item.contactId,
    //     contactFirstName: item.contactFirstName,
    //     contactLastName: item.contactLastName,
    //     contactEmail: item.contactEmail,
    //     contactPhoneNumber: item.contactPhoneNumber,
    //   }));
    // }
    return [];
  }, []);

  useEffect(() => {
    if (formattedAdmins.length > 0) {
      // Only add admins from formattedAdmins that don't already exist in allCompanyAdmins based on localId
      const existingLocalIds = new Set(allCompanyAdmins.map((s) => s.localId));
      const admins = formattedAdmins.filter(
        (s) => !existingLocalIds.has(s.localId)
      );
      if (admins.length > 0) {
        dispatch(
          updateCompanyForm({
            admins: [...allCompanyAdmins, ...admins],
          })
        );
      }
    }
  }, [formattedAdmins]);

  const handleAddAdmin = () => {
    if (selectedRows.length > 0) {
      setHandleProceed(() => handleProceedDialogForAddSchedule);
      onOpenDialog();
    } else {
      handleProceedDialogForAddSchedule();
    }
  };

  const handleSetSelectedRows = (items: number[]) => {
    // Show the Form Dialog modal only when the type is create or edit
    if (selectedRows.length > 0 && type !== 'list') {
      setHandleProceed(() => () => {
        handleProceedDialogForSelectedRow(items);
      });
      onOpenDialog();
    } else {
      setSelectedRows(items);
    }
  };

  return (
    <Flex direction="column" width="full" gap="25px" alignItems="start">
      <DataTable
        columns={columns}
        data={allCompanyAdmins}
        showFooter={type === 'edit'}
        emptyLines={5}
        isSelectable={true}
        hideSelectAllCheckBox={!selectMultiple}
        isLoading={false}
        isFetching={false}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        // totalPages={data?.data?.totalPages}
        totalPages={1}
        selectedRows={selectedRows}
        setSelectedRows={(items) => handleSetSelectedRows(items)}
        selectMultipleRows={selectMultiple}
        showEmptyState={type === 'edit'}
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
      />
      {(type === 'create' || type === 'edit') && (
        <AddAdminButtonWithErrorMessage handleAddAdmin={handleAddAdmin} />
      )}
      <LeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceed}
      />
    </Flex>
  );
};

export default AdminList;
