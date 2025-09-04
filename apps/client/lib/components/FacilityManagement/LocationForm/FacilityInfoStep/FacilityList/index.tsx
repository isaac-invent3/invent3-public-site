import { Flex, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { LeaveDialogModal, DataTable } from '@repo/ui/components';
import AddFacilityButtonWithErrorMessage from './AddFacilityButtonWithErrorMessage';
import ActionPopover from './ActionPopover';
import {
  FacilitiesInterface,
  FacilityFormInterface,
} from '~/lib/interfaces/location.interfaces';
import { useFormikContext } from 'formik';

interface FacilityListProps {
  handleAddFacility: () => void;
  activeFacility?: number;
  setActiveFacility: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowFacilityForm: React.Dispatch<React.SetStateAction<boolean>>;
  facilityLists: FacilityFormInterface[];
  setFacilityLists: React.Dispatch<
    React.SetStateAction<FacilityFormInterface[]>
  >;
}

const FacilityList = (props: FacilityListProps) => {
  const {
    handleAddFacility,
    activeFacility,
    setShowFacilityForm,
    setActiveFacility,
    facilityLists,
    setFacilityLists,
  } = props;

  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();
  const columnHelper = createColumnHelper<FacilityFormInterface>();
  const { values } = useFormikContext<FacilitiesInterface>();

  const handleProceedDialogForAddFacility = () => {
    handleAddFacility();
    onCloseDialog();
  };

  const handleProceedDialogForSelectedFacility = (
    facility: FacilityFormInterface
  ) => {
    const facilityIndex = values.facilities.findIndex(
      (item) => item.localId === facility.localId
    );
    setActiveFacility(facilityIndex);
    setShowFacilityForm(true);
    onCloseDialog();
  };

  const [handleProceed, setHandleProceed] = useState(
    () => handleProceedDialogForAddFacility
  );

  const handleAddAnotherFacility = () => {
    if (activeFacility !== undefined) {
      if (values.facilities?.[activeFacility]?.localId !== null) {
        setHandleProceed(() => handleProceedDialogForAddFacility);
        onOpenDialog();
      }
    } else {
      handleProceedDialogForAddFacility();
    }
  };

  const handleEditFacility = (facility: FacilityFormInterface) => {
    if (activeFacility !== undefined) {
      setHandleProceed(() => () => {
        handleProceedDialogForSelectedFacility(facility);
      });
      onOpenDialog();
    } else {
      handleProceedDialogForSelectedFacility(facility);
    }
  };

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('facilityName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Facility Name',
          enableSorting: false,
        }),
        columnHelper.accessor('address', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Address',
          enableSorting: false,
        }),
        columnHelper.accessor('lgaName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'LGA',
          enableSorting: false,
        }),
        columnHelper.accessor('stateName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'State/Region',
          enableSorting: false,
        }),
        columnHelper.accessor('countryName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Country',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'actions',
          cell: (info) =>
            ActionPopover(
              info.row.original,
              handleEditFacility,
              setFacilityLists
            ),
          header: '',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[facilityLists]] //eslint-disable-line
  );

  return (
    <Flex direction="column" width="full" gap="25px" alignItems="start">
      <DataTable
        columns={columns}
        data={facilityLists ?? []}
        showFooter={false}
        emptyLines={5}
        isSelectable={false}
        hideSelectAllCheckBox={false}
        isLoading={false}
        isFetching={false}
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
      <AddFacilityButtonWithErrorMessage
        handleAddFacility={handleAddAnotherFacility}
      />
      <LeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceed}
      />
    </Flex>
  );
};

export default FacilityList;
