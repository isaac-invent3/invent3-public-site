import { HStack, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DataTable, ErrorMessage, FormAddButton } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import {
  AnnualCostBreakDownItem,
  MaintenanceDepreciationFormValues,
} from '~/lib/interfaces/asset/lifeCycle.interfaces';
import AddRateModal from './AddRateModal';
import { DeleteIcon } from '~/lib/components/CustomIcons';
import { isArray } from 'lodash';

const Manual = () => {
  const columnHelper = createColumnHelper<AnnualCostBreakDownItem>();
  const { values, setFieldValue, touched, errors } =
    useFormikContext<MaintenanceDepreciationFormValues>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('year', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Year',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationRate', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Depreciation Rate (%)',
          enableSorting: false,
        }),
        columnHelper.display({
          id: 'actions',
          header: '',
          cell: (info) => (
            <Icon
              as={DeleteIcon}
              boxSize="16px"
              cursor="pointer"
              onClick={() => {
                setFieldValue(
                  'annualCostBreakDown',
                  values?.annualCostBreakDown?.filter(
                    (item, index) => index !== info.row.index
                  )
                );
              }}
            />
          ),
        }),
      ];

      return baseColumns;
    },
    [values?.annualCostBreakDown] //eslint-disable-line
  );

  return (
    <>
      <VStack width="full" maxWidth={{ lg: '460px' }}>
        <HStack width="full" justifyContent="space-between">
          <Text fontWeight={700} size="md" color="primary.500">
            Manual Annual Rate Breakdown
          </Text>
          <FormAddButton handleClick={onOpen}>Add Row</FormAddButton>
        </HStack>
        <DataTable
          columns={columns}
          data={values?.annualCostBreakDown ?? []}
          showFooter={false}
          emptyLines={3}
          maxTdWidth="250px"
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
            bgColor: '#8CA9CA',
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
            bgColor: 'white',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          customTableContainerStyle={{
            rounded: '4px',
          }}
        />
        {touched?.annualCostBreakDown &&
          errors?.annualCostBreakDown &&
          (Array.isArray(errors.annualCostBreakDown) ? (
            errors.annualCostBreakDown.map((itemError, idx) => {
              if (typeof itemError === 'string') {
                return (
                  <ErrorMessage key={`annual-${idx}`}>{itemError}</ErrorMessage>
                );
              }

              return (
                itemError &&
                Object.entries(itemError).map(([field, msg]) => (
                  <ErrorMessage key={`annual-${idx}-${field}`}>
                    {msg as string}
                  </ErrorMessage>
                ))
              );
            })
          ) : (
            <ErrorMessage>{errors.annualCostBreakDown as string}</ErrorMessage>
          ))}
      </VStack>
      <AddRateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Manual;
