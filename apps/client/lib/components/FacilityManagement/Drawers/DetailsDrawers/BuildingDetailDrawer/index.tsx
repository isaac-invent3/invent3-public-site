import {
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { DataTable, GenericDrawer } from '@repo/ui/components';
import { useGetBuildingsByFacilityIdQuery } from '~/lib/redux/services/location/building.services';
import { Building, Facility } from '~/lib/interfaces/location.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import PopoverAction from './PopoverAction';
import HeaderActionButtons from '../HeaderActionButtons';
import InfoCard from '../InfoCard';
import FloorDetailDrawer from '../FloorDetailDrawer';
import BuildingModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/BuildingModal';

interface BuildingDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  facilityData: Facility;
}

const BuildingDetailDrawer = (props: BuildingDetailDrawerProps) => {
  const { facilityData, isOpen, onClose } = props;
  const { data, isLoading, isFetching } = useGetBuildingsByFacilityIdQuery(
    { id: facilityData.facilityId },
    {
      skip: !facilityData.facilityId,
    }
  );
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const {
    isOpen: isOpenFloorDetail,
    onClose: onCloseFloorDetail,
    onOpen: onOpenFloorDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();
  const columnHelper = createColumnHelper<Building>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('buildingRef', {
          cell: (info) => info.getValue(),
          header: 'Building Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('buildingName', {
          cell: (info) => info.getValue(),
          header: 'Building Name',
          enableSorting: false,
        }),
        columnHelper.accessor('buildingId', {
          cell: (info) => info.getValue(),
          header: 'Number of Floors',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'action',
          cell: (info) => <PopoverAction data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="597px">
        <DrawerHeader p={0} m={0}>
          <HeaderActionButtons
            closeDrawer={onClose}
            suffix="Building"
            handleButtonClick={onOpenCreateModal}
          />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing="24px">
            <InfoCard
              title={`${facilityData?.facilityName} (Facility)`}
              subtitle={facilityData?.address}
              count={facilityData?.totalBuildingsInFacility}
              locationTitle="Buildings"
            />
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={data?.data?.items ?? []}
              showFooter={false}
              customTdStyle={{
                paddingLeft: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                bgColor: '#f2f1f1',
              }}
              handleSelectRow={(row) => {
                setSelectedBuilding(row);
                onOpenFloorDetail();
              }}
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      {selectedBuilding && (
        <FloorDetailDrawer
          onClose={() => {
            onCloseFloorDetail();
          }}
          isOpen={isOpenFloorDetail}
          buildingData={selectedBuilding}
        />
      )}
      <BuildingModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultFacilityId={facilityData.facilityId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default BuildingDetailDrawer;
