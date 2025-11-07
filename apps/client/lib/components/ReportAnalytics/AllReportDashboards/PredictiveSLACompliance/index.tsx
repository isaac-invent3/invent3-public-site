'use client';

import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GenericFilter } from '~/lib/interfaces/dashboard.interfaces';
import {
  clearFilter,
  initialGeneralFilters,
  updateFilters,
} from '~/lib/redux/slices/CommonSlice';
import { useAppDispatch } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';
import Summary from './Summary';
import Filters from './Filters';
import ExportButton from '~/lib/components/UI/ExportButton';
import PageHeader from '~/lib/components/UI/PageHeader';
import { downloadPageAsPDF } from '~/lib/utils/pdfUtils';
import PerformanceTrendAndAIHighlights from './PerformanceTrendAndAIHighlights';
import PredictiveSLATaskBreakdown from './PredictiveSLATaskBreakdown';

const PredictiveSLACompliance = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      await downloadPageAsPDF({
        elementId: 'predictive-sla-compliance',
        fileName: 'Predictive_SLA_Compliance.pdf',
        excludeSelectors: ['.no-pdf'],
        headingId: 'page-heading',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      id="predictive-sla-compliance"
      width="full"
      direction="column"
      gap="14px"
      pb="16px"
      px={{ base: '16px', md: 0 }}
    >
      <HStack
        width="full"
        alignItems="flex-start"
        spacing="8px"
        pb="26px"
        justifyContent="space-between"
      >
        <PageHeader id="page-heading">
          Predictive SLA Compliance Tracking
        </PageHeader>
        <ExportButton handleClick={() => {}} isLoading={false} />
      </HStack>
      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onApply={handleApply}
        onReset={handleReset}
      />
      <Summary />
      <PerformanceTrendAndAIHighlights />
      <PredictiveSLATaskBreakdown />
    </Flex>
  );
};

export default PredictiveSLACompliance;
