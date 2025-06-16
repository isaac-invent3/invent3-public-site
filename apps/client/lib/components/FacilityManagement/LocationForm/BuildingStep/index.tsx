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
import Building from '../../LocationModals/BuildingModal';

interface BuildingStepProps {
  activeStep: number;
}
const BuildingStep = (props: BuildingStepProps) => {
  const { activeStep } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const columnHelper = createColumnHelper<CreateBuildingDto>();

  const handleDelete = (index: number) => {
    const updatedBuildings = [...(values.createBuildingDtos ?? [])];
    updatedBuildings.splice(index, 1);
    setFieldValue('createBuildingDtos', updatedBuildings);
  };

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('createBuildingDto.buildingRef', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Building Ref',
          enableSorting: false,
        }),
        columnHelper.accessor('createBuildingDto.buildingName', {
          cell: (info) => info.getValue(),
          header: 'Building Name',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'action',
          cell: (info) => (
            <PopoverAction handleDelete={() => handleDelete(info.row.index)} />
          ),
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[values.createBuildingDtos]] //eslint-disable-line
  );

  return (
    <>
      <VStack
        spacing={{ base: '24px', lg: '43px' }}
        width="full"
        alignItems="center"
        bgColor="white"
        p="8px"
        rounded="6px"
        minH={{ lg: '60vh' }}
        display={activeStep === 2 ? 'flex' : 'none'}
      >
        <DataTable
          columns={columns}
          data={values?.createBuildingDtos ?? []}
          showEmptyState={false}
          showFooter={false}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '12px',
            paddingBottom: '12px',
            bgColor: '#f2f1f1',
          }}
        />
        <FormAddButton handleClick={onOpen} customStyle={{ my: '40px' }}>
          Add New Building
        </FormAddButton>
      </VStack>
      <Building isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BuildingStep;
