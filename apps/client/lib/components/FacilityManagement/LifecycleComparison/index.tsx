'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import Filters from './Filters';
import Summary from './Summary';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetLifecycleDashboardSummaryQuery } from '~/lib/redux/services/location/lifecycleComparison.services';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';

const initialState: LifeCycleFilter = {
  datePeriod: [],
  facilities: [],
  assetCategories: [],
  metricsToCompare: [],
  assetStatus: [],
};
const LifecyleComparison = () => {
  const [filters, setFilters] = useState<LifeCycleFilter>(initialState);
  const [finalAppliedFilter, setFinalAppliedFilter] =
    useState<LifeCycleFilter>(initialState);
  const { data, isLoading, isFetching } = useGetLifecycleDashboardSummaryQuery({
    ...finalAppliedFilter,
  });

  const handleFilterChange = (
    key: keyof LifeCycleFilter,
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
    setFinalAppliedFilter(filters);
  };

  const handleReset = () => {
    setFilters(initialState);
    setFinalAppliedFilter(initialState);
  };

  return (
    <Flex
      id="lifecycle-page"
      width="full"
      direction="column"
      gap="25px"
      pb="24px"
    >
      <Header />
      <Flex
        width="full"
        direction="column"
        gap="16px"
        px={{ base: '16px', md: 0 }}
      >
        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
        />
        <Summary data={data?.data} isLoading={isLoading || isFetching} />
        <SectionThree
          filters={finalAppliedFilter}
          lifeCycleCosts={data?.data?.costByFacility}
          isLoading={isLoading || isFetching}
        />
        <SectionFour filters={finalAppliedFilter} />
      </Flex>
    </Flex>
  );
};

export default LifecyleComparison;
