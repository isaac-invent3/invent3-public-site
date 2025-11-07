import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React, { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import DateRangeFilter from '~/lib/components/Common/FilterComponents/DateRangeFilter';
import { GenericFilter } from '~/lib/interfaces/dashboard.interfaces';
import { downloadPageAsPDF } from '~/lib/utils/pdfUtils';

interface FiltersProps {
  filters: GenericFilter;
  onChange: (
    key: keyof GenericFilter,
    value: Option[],
    singleSelect?: boolean
  ) => void;
  onApply: () => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onApply,
  onReset,
}) => {
  return (
    <VStack
      alignItems="flex-start"
      py={2}
      px={4}
      bgColor="white"
      rounded="8px"
      spacing={4}
    >
      <Text size="md" color="neutral.800">
        Filters
      </Text>
      <HStack
        width={{ base: 'full' }}
        alignItems="flex-start"
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '16px' }}
        className="no-pdf"
        flexWrap="wrap"
      >
        <DateRangeFilter
          handleSelectedOption={(val: Option) =>
            onChange('datePeriod', [val], true)
          }
          selectedOptions={filters?.datePeriod.map((item) => ({
            label: item.toString(),
            value: item,
          }))}
        />

        <HStack spacing="16px">
          <Button
            customStyles={{ width: '110px', height: '36px' }}
            handleClick={onApply}
          >
            Apply Filter
          </Button>
          <Text
            as="button"
            color="blue.500"
            whiteSpace="nowrap"
            onClick={onReset}
          >
            Reset Filter
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Filters;
