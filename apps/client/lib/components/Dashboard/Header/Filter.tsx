import { HStack } from '@chakra-ui/react';
import React from 'react';
import DropDown from '../Common/DropDown';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { updateInfo } from '~/lib/redux/slices/DashboardSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllCountriesQuery } from '~/lib/redux/services/location/country.services';
import { useGetStatesByCountryIdQuery } from '~/lib/redux/services/location/state.services';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { selectedState, selectedCountry } = useAppSelector(
    (state) => state.dashboard.info
  );

  const { data: allCountries, isLoading: isLoadingCountries } =
    useGetAllCountriesQuery({});
  const { data: allStates, isLoading: isLoadingStates } =
    useGetStatesByCountryIdQuery(
      { id: Number(selectedCountry?.value) ?? undefined, pageSize: 37 },
      { skip: !selectedCountry?.value }
    );

  return (
    <HStack spacing="8px">
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
        handleClick={(option) =>
          dispatch(updateInfo({ selectedCountry: option }))
        }
        selectedOptions={selectedCountry}
        width="150px"
      />
      <DropDown
        options={[
          { label: 'All', value: null },
          ...generateOptions(allStates?.data?.items, 'stateName', 'stateId'),
        ]}
        isLoading={isLoadingStates}
        label="Region"
        handleClick={(option) =>
          dispatch(updateInfo({ selectedState: option }))
        }
        selectedOptions={selectedState}
        width="150px"
      />
    </HStack>
  );
};

export default Filter;
