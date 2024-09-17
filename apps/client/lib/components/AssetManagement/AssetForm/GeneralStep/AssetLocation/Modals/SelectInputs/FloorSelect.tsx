import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllFloorsQuery,
  useSearchFloorsMutation,
} from '~/lib/redux/services/asset/location.services';

interface FloorSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const FloorSelect = (props: FloorSelectProps) => {
  const { handleSelect } = props;
  const [searchFloor] = useSearchFloorsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllFloorsQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="floorId"
      selectTitle="Floor"
      data={data}
      labelKey="floorName"
      valueKey="floorId"
      mutationFn={searchFloor}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default FloorSelect;
