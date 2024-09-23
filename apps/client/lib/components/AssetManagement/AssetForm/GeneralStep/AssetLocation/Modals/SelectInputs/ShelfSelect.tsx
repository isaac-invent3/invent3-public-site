import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllShelvesQuery,
  useGetShelvesByAisleIdQuery,
  useSearchShelfMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface ShelfSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  aisleId?: number | null;
}

const ShelfSelect = (props: ShelfSelectProps) => {
  const { handleSelect, type, aisleId } = props;
  const [searchShelf] = useSearchShelfMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllShelvesQuery(
    {
      pageSize: 25,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const { data: shelvesByAisleIdData, isLoading: isLoadingShelvesByAisleId } =
    useGetShelvesByAisleIdQuery(
      {
        id: aisleId,
        pageSize: 25,
        pageNumber,
      },
      { skip: !aisleId }
    );

  const shelvesByAisleIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'aisleId',
        columnValue: aisleId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'shelfName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="shelfId"
      selectTitle="Shelf"
      data={type === 'general' ? data : aisleId ? shelvesByAisleIdData : []}
      labelKey="shelfName"
      valueKey="shelfId"
      mutationFn={searchShelf}
      isLoading={isLoading || isLoadingShelvesByAisleId}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={aisleId}
      specialSearch={
        type === 'specificById' ? shelvesByAisleIdCriterion : undefined
      }
    />
  );
};

export default ShelfSelect;
