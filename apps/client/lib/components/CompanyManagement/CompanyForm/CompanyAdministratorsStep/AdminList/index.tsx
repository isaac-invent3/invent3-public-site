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
import { useGetAllCompanyAdminUsersQuery } from '~/lib/redux/services/user.services';

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

  const {
    admins: allCompanyAdmins,
    companyId,
    tenantName,
  } = useAppSelector((state) => state.company.companyForm);
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [action, setAction] = useState<'new' | 'update' | null>(null);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllCompanyAdminUsersQuery({
    companyId: companyId!,
    companySlug: tenantName!,
    pageSize,
    pageNumber: currentPage,
  });
  const columnHelper = createColumnHelper<AdminFormDetails>();

  const handleProceedDialogForAddAdmin = () => {
    setAction('new');
    setSelectedRows([]);
    dispatch(clearSingleAdminForm());
    setShowAdminInfo(true);
    onCloseDialog();
  };

  const handleProceedDialogForSelectedRow = (data: AdminFormDetails) => {
    dispatch(updateSingleAdminForm(data));
    setAction('update');
    setShowAdminInfo(true);
    onCloseDialog();
  };

  const [handleProceed, setHandleProceed] = useState(
    () => handleProceedDialogForAddAdmin
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
          cell: (info) =>
            ActionPopover({
              type,
              info: info.row.original,
              handleEditAdmin: (data) => {
                handleAdminUpdate(data);
              },
            }),
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

  const handleAdminUpdate = (data: AdminFormDetails) => {
    if (showAdminInfo) {
      setHandleProceed(() => () => {
        handleProceedDialogForSelectedRow(data);
      });
      onOpenDialog();
    } else {
      handleProceedDialogForSelectedRow(data);
    }
  };

  const formattedAdmins: AdminFormDetails[] = useMemo(() => {
    if (data?.data && data?.data?.items?.length >= 1) {
      const users = data.data.items;
      return users.map((item) => ({
        contactId: item.userId,
        localId: item.userId,
        contactFirstName: item.firstName,
        contactLastName: item.lastName,
        contactEmail: item.email,
        contactPhoneNumber: item.phoneNumber,
      }));
    }
    return [];
  }, [data]);

  const handleAddAdmin = () => {
    if (selectedRows.length > 0) {
      setHandleProceed(() => handleProceedDialogForAddAdmin);
      onOpenDialog();
    } else {
      handleProceedDialogForAddAdmin();
    }
  };

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

  return (
    <Flex direction="column" width="full" gap="25px" alignItems="start">
      <DataTable
        columns={columns}
        data={allCompanyAdmins}
        showFooter={type === 'edit' && data?.data && data?.data?.totalPages > 1}
        emptyLines={5}
        isSelectable={false}
        hideSelectAllCheckBox={!selectMultiple}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
        selectedRows={selectedRows}
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
