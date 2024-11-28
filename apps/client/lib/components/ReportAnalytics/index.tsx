'use client';

import { Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';
import ReportCard from './Common/ReportCard';

const ReportAnalytics = () => {
  const getTodayDate = () => {
    return dateFormatter(new Date(), 'DD-MM-YYYY') as string;
  };

  const initialFilters = {
    region: [],
    area: [],
    branch: [],
    fromDate: getTodayDate(),
    toDate: getTodayDate(),
  };

  const [filterData, setFilterData] =
    useState<TicketFilterInput>(initialFilters);

  const clearFilters = () => {
    setFilterData(initialFilters);
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />

      <GeneralFilter
        filterData={filterData}
        setFilterData={setFilterData}
        clearFilters={clearFilters}
      />

   

      <ReportCard
        title="Total Assets"
        value="108,098"
        onViewReport={() => alert('View Report Clicked')}
      />

      
    </Flex>
  );
};

export default ReportAnalytics;
