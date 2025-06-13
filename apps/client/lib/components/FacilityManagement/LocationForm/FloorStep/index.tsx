import { useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import {
  CreateBuildingDto,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';
import Floor from '../../LocationModals/FloorModal';

interface FloorStepProps {
  activeStep: number;
}
const FloorStep = (props: FloorStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const flattenedFloors = useMemo(() => {
    return (
      values?.createBuildingDtos?.flatMap((building) => {
        const floors = building?.createFloorDtos ?? [];
        return floors.map((floor) => ({
          buildingName: building.createBuildingDto.buildingName,
          floorName: floor.createFloorDto.floorName,
          floorRef: floor.createFloorDto.floorRef,
        }));
      }) ?? []
    );
  }, [values?.createBuildingDtos]);

  const columnHelper = createColumnHelper<{
    buildingName: string;
    floorName: string;
    floorRef: string | null;
  }>();

  const columns = useMemo(
    () => [
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
      columnHelper.accessor('buildingName', {
        cell: (info) => info.getValue(),
        header: 'Building Name',
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'action',
        cell: () => <PopoverAction />,
        header: 'Action',
        enableSorting: false,
      }),
    ],
    []
  );

  return (
    <>
      <VStack
        spacing={{ base: '24px', lg: '43px' }}
        width="full"
        alignItems="center"
        bgColor="white"
        pt={{ base: '16px', lg: '19px' }}
        pl={{ md: '24px', lg: '28px' }}
        pb={{ base: '16px', lg: '33px' }}
        pr={{ md: '24px', lg: '38px' }}
        rounded="6px"
        minH={{ lg: '60vh' }}
        display={activeStep === 3 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={flattenedFloors ?? []}
          showFooter={false}
          showEmptyState={false}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            bgColor: '#f2f1f1',
          }}
        />
        <FormAddButton handleClick={onOpen} customStyle={{ my: '40px' }}>
          Add New Floor
        </FormAddButton>
      </VStack>
      <Floor isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FloorStep;
