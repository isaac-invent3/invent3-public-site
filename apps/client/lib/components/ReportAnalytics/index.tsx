'use client';

import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';

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
    </Flex>
  );
};

export default ReportAnalytics;
