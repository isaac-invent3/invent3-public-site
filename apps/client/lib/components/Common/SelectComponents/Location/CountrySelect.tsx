import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllCountriesQuery,
  useSearchCountriesMutation,
} from '~/lib/redux/services/location/country.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface CountrySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  name?: string;
  defaultInputValue?: string;
}

const CountrySelect = ({
  name,
  handleSelect,
  defaultInputValue,
}: CountrySelectProps) => {
  const [searchCategory] = useSearchCountriesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllCountriesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={name ?? 'countryId'}
      selectTitle="Country"
      data={data}
      labelKey="countryName"
      valueKey="countryId"
      defaultInputValue={defaultInputValue}
      mutationFn={searchCategory}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default CountrySelect;
