import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllShelvesQuery,
  useSearchShelfMutation,
} from '~/lib/redux/services/asset/location.services';

interface ShelfSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const ShelfSelect = (props: ShelfSelectProps) => {
  const { handleSelect } = props;
  const [searchShelf] = useSearchShelfMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllShelvesQuery({
    pageSize: 25,
    pageNumber,
  });

  return (
    <GenericAsyncSelect
      selectName="shelfId"
      selectTitle="Shelf"
      data={data}
      labelKey="shelfName"
      valueKey="shelfId"
      mutationFn={searchShelf}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default ShelfSelect;
