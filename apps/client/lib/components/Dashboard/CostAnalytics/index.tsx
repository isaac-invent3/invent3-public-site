'use client';

import { Flex, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GenericFilter } from '~/lib/interfaces/dashboard.interfaces';
import {
  clearFilter,
  initialGeneralFilters,
  updateFilters,
} from '~/lib/redux/slices/CommonSlice';
import PageHeader from '../../UI/PageHeader';
import { useAppDispatch } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';
import Filters from './Filters';
import Summary from './Summary';

const PredictiveMaintenance = () => {
  const [filters, setFilters] = useState<GenericFilter>(initialGeneralFilters);
  const disptach = useAppDispatch();

  const handleFilterChange = (
    key: keyof GenericFilter,
    value: Option[],
    singleSelect = false
  ) => {
    setFilters((prev) => {
      const currentValues = prev[key] as (string | number)[];

      if (singleSelect) {
        // For single-select filters, only keep the last selected value
        const selectedValue = value[value.length - 1]?.value;
        return { ...prev, [key]: selectedValue ? [selectedValue] : [] };
      }

      // Multi-select toggle logic
      const newValues = [...currentValues];
      value.forEach((item) => {
        const index = newValues.indexOf(item.value);
        if (index > -1) {
          newValues.splice(index, 1); // remove if exists
        } else {
          newValues.push(item.value); // add if new
        }
      });

      return { ...prev, [key]: newValues };
    });
  };

  const handleApply = () => {
    disptach(updateFilters(filters));
  };

  const handleReset = () => {
    setFilters(initialGeneralFilters);
    disptach(clearFilter());
  };

  return (
    <Flex
      id="tickets-dashboard"
      width="full"
      direction="column"
      gap="14px"
      pb="16px"
      px={{ base: '16px', md: 0 }}
    >
      <VStack width="full" alignItems="flex-start" spacing="8px" pb="26px">
        <PageHeader id="page-heading">Cost Analytics Dashboard</PageHeader>
        <Text color="#6E7D8E" fontWeight={700} size="md">
          Live data stream active | All values in ₦ | Auto-refresh every 60s
        </Text>
      </VStack>
      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Summary />
    </Flex>
  );
};

export default PredictiveMaintenance;
