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
import PerformanceTrendAssetHealth from './PerformanceTrendAssetHealth';
import AssetPerformanceByCategoryTable from './AssetPerformanceByCategoryTable';
import PredictiveRiskReliabilityMetrics from './PredictiveRiskReliabilityMetrics';

const AssetPerformanceDashboard = () => {
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
      id="asset-performance"
      width="full"
      direction="column"
      gap="24px"
      pb="16px"
    >
      <VStack width="full" alignItems="flex-start" spacing="16px">
        <PageHeader id="page-heading">Asset Performance Dashboard</PageHeader>
        <Text color="#6E7D8E" fontWeight={700} size="md">
          Real-time dashboard providing insights into asset health, uptime,
          risk, and performance across facilities.
        </Text>
      </VStack>
      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Summary />
      <PerformanceTrendAssetHealth />
      <PredictiveRiskReliabilityMetrics />
      <AssetPerformanceByCategoryTable />
    </Flex>
  );
};

export default AssetPerformanceDashboard;
