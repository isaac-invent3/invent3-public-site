import { HStack, Text, VStack } from '@chakra-ui/react';

import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';
import { useSession } from 'next-auth/react';
import { dateFormatter } from '~/lib/utils/Formatters';
import DropDown from './Common/DropDown';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { useGetStatesByCountryIdQuery } from '~/lib/redux/services/location/state.services';
import { useGetAllCountriesQuery } from '~/lib/redux/services/location/country.services';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateInfo } from '~/lib/redux/slices/DashboardSlice';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Overview',
    route: '#',
  },
];

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

const Header = () => {
  const dispatch = useAppDispatch();
  const { selectedState, selectedCountry } = useAppSelector(
    (state) => state.dashboard.info
  );

  const { data } = useSession();
  const now = new Date();

  const { data: allCountries, isLoading: isLoadingCountries } =
    useGetAllCountriesQuery({});
  const { data: allStates, isLoading: isLoadingStates } =
    useGetStatesByCountryIdQuery(
      { id: Number(selectedCountry?.value) ?? undefined, pageSize: 37 },
      { skip: !selectedCountry?.value }
    );
  return (
    <VStack spacing="45px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <HStack width="full" spacing="8px" alignItems="flex-end">
          <PageHeader>
            {`${getGreeting()}, ${data?.user?.firstName ?? ''}!`}
          </PageHeader>
          <Text
            color="neutral.600"
            fontWeight={700}
          >{`It's ${dateFormatter(now, 'dddd D, MMMM YYYY')}`}</Text>
        </HStack>
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
              ...generateOptions(
                allStates?.data?.items,
                'stateName',
                'stateId'
              ),
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
      </HStack>
    </VStack>
  );
};

export default Header;
