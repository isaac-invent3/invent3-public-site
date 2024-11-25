'use client';

import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';

const ReportAnalytics = () => {
  const [filterData, setFilterData] = useState<TicketFilterInput>({
    region: [],
    lga: [],
    branch: [],
    fromDate: undefined,
    toDate: undefined,
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />

      <GeneralFilter filterData={filterData} setFilterData={setFilterData} />
    </Flex>
  );
};

export default ReportAnalytics;
