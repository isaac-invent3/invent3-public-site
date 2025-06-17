import {
  DrawerBody,
  DrawerHeader,
  Heading,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { DataTable, GenericDrawer } from '@repo/ui/components';
import { Building, Floor } from '~/lib/interfaces/location.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useGetFloorsByBuildingIdQuery } from '~/lib/redux/services/location/floor.services';
import HeaderActionButtons from '../HeaderActionButtons';
import InfoCard from '../InfoCard';
import DepartmentDetailDrawer from '../DepartmentDetailDrawer';
import PopoverAction from './PopoverAction';
import FloorModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/FloorModal';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { registerCloseFn } from '../utils';

interface FloorDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  buildingData: Building;
  facilityAddress: string;
}

const FloorDetailDrawer = (props: FloorDetailDrawerProps) => {
  const { buildingData, isOpen, onClose, facilityAddress } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetFloorsByBuildingIdQuery(
    { id: buildingData.buildingId, pageNumber, pageSize },
    {
      skip: !buildingData.buildingId,
    }
  );
  const [selectedFloor, setselectedFloor] = useState<Floor | null>(null);
  const {
    isOpen: isOpenDepartmentDetail,
    onClose: onCloseDepartmentDetail,
    onOpen: onOpenDepartmentDetail,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper<Floor>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('floorRef', {
          cell: (info) => info.getValue(),
          header: 'Floor Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('floorName', {
          cell: (info) => info.getValue(),
          header: 'Floor Name',
          enableSorting: false,
        }),
        columnHelper.accessor('departmentsInFloor', {
          cell: (info) => info.getValue(),
          header: 'Number of Departments',
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
            suffix="Floor"
            handleButtonClick={onOpenCreateModal}
          />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing="24px" alignItems="flex-start">
            <Heading
              fontSize={{ base: '16px', lg: '24px' }}
              px={{ base: '16px', lg: '32px' }}
              lineHeight="100%"
              fontWeight={800}
              color="neutral.800"
            >
              Building Details
            </Heading>
            <InfoCard
              title={`${buildingData?.buildingName}`}
              dividerText="At"
              subtitle={facilityAddress}
              count={buildingData?.totalFloorsInBuilding}
              locationTitle="Floors"
            />
            <DataTable
              columns={columns}
              isLoading={isLoading || isFetching}
              data={data?.data?.items ?? []}
              showFooter={
                data?.data?.hasNextPage || data?.data?.hasPreviousPage
              }
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              pageSize={pageSize}
              setPageSize={setPageSize}
              customThStyle={{ paddingLeft: { base: '16px', lg: '32px' } }}
              customTdStyle={{
                paddingLeft: { base: '16px', lg: '32px' },
                paddingTop: '12px',
                paddingBottom: '12px',
                bgColor: '#f2f1f1',
              }}
              handleSelectRow={(row) => {
                setselectedFloor(row);
                registerCloseFn(onClose);
                registerCloseFn(onCloseDepartmentDetail);
                onOpenDepartmentDetail();
              }}
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      {selectedFloor && (
        <DepartmentDetailDrawer
          onClose={onCloseDepartmentDetail}
          isOpen={isOpenDepartmentDetail}
          floorData={selectedFloor}
          buildingName={buildingData?.buildingName}
        />
      )}
      <FloorModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultBuildingId={buildingData.buildingId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default FloorDetailDrawer;
