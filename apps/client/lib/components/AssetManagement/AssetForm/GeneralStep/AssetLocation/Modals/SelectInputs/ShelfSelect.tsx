import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllShelvesQuery,
  useGetShelvesByAisleIdQuery,
  useSearchShelfMutation,
} from '~/lib/redux/services/location/shelf.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface ShelfSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  aisleId?: number | null;
}

const ShelfSelect = (props: ShelfSelectProps) => {
  const { handleSelect, type, aisleId } = props;
  const { shelfName } = useAppSelector((state) => state.asset.assetForm);
  const [searchShelf] = useSearchShelfMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllShelvesQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: shelvesByAisleIdData,
    isLoading: isLoadingShelvesByAisleId,
    isFetching: isFetchingShelvesByAisleId,
  } = useGetShelvesByAisleIdQuery(
    {
      id: aisleId ?? undefined,
      pageSize: DEFAULT_PAGE_SIZE,
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
      defaultInputValue={shelfName}
      mutationFn={searchShelf}
      isLoading={
        isLoading ||
        isLoadingShelvesByAisleId ||
        isFetching ||
        isFetchingShelvesByAisleId
      }
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
