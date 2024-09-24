import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllCountriesQuery,
  useSearchCountriesMutation,
} from '~/lib/redux/services/asset/location.services';

interface CountrySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const CountrySelect = ({ handleSelect }: CountrySelectProps) => {
  const [searchCategory] = useSearchCountriesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllCountriesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="countryId"
      selectTitle="Country"
      data={data}
      labelKey="countryName"
      valueKey="countryId"
      mutationFn={searchCategory}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default CountrySelect;
