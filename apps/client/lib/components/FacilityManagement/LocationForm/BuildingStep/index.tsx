import { VStack } from '@chakra-ui/react';
import { DataTable, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import {
  BuildingModel,
  LocationMasterFormInterface,
} from '~/lib/interfaces/location.interfaces';
import PopoverAction from '../PopoverAction';

interface BuildingStepProps {
  activeStep: number;
}
const BuildingStep = (props: BuildingStepProps) => {
  const { activeStep } = props;
  const { values, setFieldValue } =
    useFormikContext<LocationMasterFormInterface>();

  const columnHelper = createColumnHelper<BuildingModel>();

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
        columnHelper.accessor('buildingRef', {
          cell: (info) => <PopoverAction />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[values.buildingModel]] //eslint-disable-line
  );

  return (
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
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <DataTable
        columns={columns}
        data={values?.buildingModel ?? []}
        showEmptyState={false}
      />
      <FormAddButton handleClick={() => {}} customStyle={{ my: '40px' }}>
        Add New Building
      </FormAddButton>
    </VStack>
  );
};

export default BuildingStep;
