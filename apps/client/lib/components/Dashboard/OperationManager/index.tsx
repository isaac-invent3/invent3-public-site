import { Flex, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import { useGetDashboardStatsQuery } from '~/lib/redux/services/dashboard.services';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateInfo } from '~/lib/redux/slices/DashboardSlice';
import Header from '../Header';
import Filter from '../Header/Filter';

const OperationManager = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const dispatch = useAppDispatch();
  const {
    data: statsData,
    isLoading,
    isFetching,
  } = useGetDashboardStatsQuery({
    id: selectedCountry?.value,
    ...(selectedState?.value ? { regionId: selectedState?.value } : {}),
  });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(updateInfo({ isLoading: true }));
    } else {
      dispatch(updateInfo({ isLoading: false }));
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (statsData?.data) {
      dispatch(updateInfo({ stats: statsData?.data }));
    }
  }, [statsData]);
  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <Header>
        <Filter />
      </Header>
      <VStack width="full" mt="32px" spacing="16px">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </VStack>
    </Flex>
  );
};

export default OperationManager;
