import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllCountriesQuery,
  useSearchCountriesMutation,
} from '~/lib/redux/services/asset/location.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface CountrySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const CountrySelect = ({ handleSelect }: CountrySelectProps) => {
  const [searchCategory] = useSearchCountriesMutation({});
  const { countryName } = useAppSelector((state) => state.asset.assetForm);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllCountriesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="countryId"
      selectTitle="Country"
      data={data}
      labelKey="countryName"
      valueKey="countryId"
      defaultInputValue={countryName}
      mutationFn={searchCategory}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default CountrySelect;
