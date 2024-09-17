import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllBuildingsQuery,
  useSearchBuildingMutation,
} from '~/lib/redux/services/asset/location.services';

interface BuildingSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const BuildingSelect = (props: BuildingSelectProps) => {
  const { handleSelect } = props;
  const [searchBuilding] = useSearchBuildingMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllBuildingsQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="buildingId"
      selectTitle="Building"
      data={data}
      labelKey="buildingName"
      valueKey="buildingId"
      mutationFn={searchBuilding}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default BuildingSelect;
