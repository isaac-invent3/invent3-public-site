import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllAislesQuery,
  useSearchAisleMutation,
} from '~/lib/redux/services/asset/location.services';

interface AisleSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const AisleSelect = (props: AisleSelectProps) => {
  const { handleSelect } = props;
  const [searchAisle] = useSearchAisleMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllAislesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="aisleId"
      selectTitle="Aisle"
      data={data}
      labelKey="aisleName"
      valueKey="aisleId"
      mutationFn={searchAisle}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default AisleSelect;
