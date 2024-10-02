'use client';

import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './header';
import ContentOne from './ContentOne';
import ContentTwo from './ContentTwo';
import ContentThree from './ContentThree';
import ContentFour from './ContentFour';
import { Option } from '~/lib/interfaces/general.interfaces';
import DropDown from './Common/DropDown';
import {
  useGetAllCountriesQuery,
  useGetStatesByCountryIdQuery,
} from '~/lib/redux/services/asset/location.services';
import { generateOptions } from '~/lib/utils/helperFunctions';

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>({
    label: 'Nigeria',
    value: 1,
  });
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const { data: allCountries, isLoading: isLoadingCountries } =
    useGetAllCountriesQuery({});
  const { data: allStates, isLoading: isLoadingStates } =
    useGetStatesByCountryIdQuery({ id: selectedCountry?.value, pageSize: 37 });
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <VStack width="full" mt="32px" spacing="16px">
        <HStack width="full" justifyContent="flex-end">
          <DropDown
            options={
              generateOptions(
                allCountries?.data?.items,
                'countryName',
                'countryId'
              ) ?? []
            }
            isLoading={isLoadingCountries}
            label="Country"
            handleClick={(option) => setSelectedCountry(option)}
            selectedOptions={selectedCountry}
            width="150px"
          />
          <DropDown
            options={
              generateOptions(allStates?.data?.items, 'stateName', 'stateId') ??
              []
            }
            isLoading={isLoadingStates}
            label="Region"
            handleClick={(option) => setSelectedState(option)}
            selectedOptions={selectedState}
            width="150px"
          />
        </HStack>
        <ContentOne />
        <ContentTwo />
        <ContentThree />
        <ContentFour />
      </VStack>
    </Flex>
  );
};

export default Dashboard;
