import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllMaintenanceFrequenciesQuery,
  useSearchMaintenanceFrequenciesMutation,
} from '~/lib/redux/services/maintenance/frequency.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface FrequencySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultName?: string | null;
}
const FrequencySelect = (props: FrequencySelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultName } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllMaintenanceFrequenciesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [searchMaintenanceFrequency] = useSearchMaintenanceFrequenciesMutation(
    {}
  );

  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="frequencyName"
      valueKey="frequencyId"
      defaultInputValue={defaultName}
      mutationFn={searchMaintenanceFrequency}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default FrequencySelect;
