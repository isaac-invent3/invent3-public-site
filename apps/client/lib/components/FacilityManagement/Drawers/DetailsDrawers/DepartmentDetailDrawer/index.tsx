import {
  DrawerBody,
  DrawerHeader,
  Heading,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { Button, DataTable, GenericDrawer } from '@repo/ui/components';
import { Department, Floor } from '~/lib/interfaces/location.interfaces';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useGetDepartmentsByFloorIdQuery } from '~/lib/redux/services/location/department.services';
import HeaderActionButtons from '../HeaderActionButtons';
import InfoCard from '../InfoCard';
import RoomDetailDrawer from '../RoomDetailDrawer';
import PopoverAction from './PopoverAction';
import DepartmentModal from '~/lib/components/AssetManagement/AssetForm/GeneralStep/AssetLocation/Modals/DepartmentModal';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface DepartmentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  floorData: Floor;
  buildingName: string;
}

const DepartmentDetailDrawer = (props: DepartmentDetailDrawerProps) => {
  const { floorData, isOpen, onClose, buildingName } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetDepartmentsByFloorIdQuery(
    { id: floorData.floorId, pageNumber, pageSize },
    {
      skip: !floorData.floorId,
    }
  );
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const {
    isOpen: isOpenDepartmentDetail,
    onClose: onCloseRoomDetail,
    onOpen: onOpenRoomDetail,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateModal,
    onClose: onCloseCreateModal,
    onOpen: onOpenCreateModal,
  } = useDisclosure();

  const columnHelper = createColumnHelper<Department>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('departmentRef', {
          cell: (info) => info.getValue(),
          header: 'Department Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('departmentName', {
          cell: (info) => info.getValue(),
          header: 'Department Name',
          enableSorting: false,
        }),
        columnHelper.accessor('departmentId', {
          cell: (info) => info.getValue(),
          header: 'Number of Rooms',
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
            suffix="Department"
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
              Floor Details
            </Heading>
            <InfoCard
              title={`${floorData?.floorName}`}
              dividerText="In"
              subtitle={buildingName}
              count={floorData?.departmentsInFloor}
              locationTitle="Departments"
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
                setSelectedDepartment(row);
                onOpenRoomDetail();
              }}
            />
          </VStack>
        </DrawerBody>
      </GenericDrawer>
      {selectedDepartment && (
        <RoomDetailDrawer
          onClose={onCloseRoomDetail}
          isOpen={isOpenDepartmentDetail}
          departmentData={selectedDepartment}
          floorName={floorData?.floorName}
        />
      )}
      <DepartmentModal
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        defaultFloorId={floorData.floorId}
        showDropdown={false}
        showToast
      />
    </>
  );
};

export default DepartmentDetailDrawer;
