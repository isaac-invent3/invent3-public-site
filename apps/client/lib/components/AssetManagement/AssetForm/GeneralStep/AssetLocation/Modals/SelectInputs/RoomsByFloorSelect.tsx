import React, { useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllRoomsInAFloorQuery,
  useSearchRoomsMutation,
} from '~/lib/redux/services/location/room.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface RoomByFloorSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  floorId?: number | null;
  selectStyles?: CSSObjectWithLabel;
  selectName?: string;
}

const RoomByFloorSelect = (props: RoomByFloorSelectProps) => {
  const { handleSelect, type, floorId, selectStyles, selectName } = props;
  const { roomName } = useAppSelector((state) => state.asset.assetForm);
  const [searchRooms] = useSearchRoomsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllRoomsInAFloorQuery(
    {
      floorId: floorId!,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: roomsByDepartmentIdData,
    isLoading: isLoadingRoomsByDepartmentIdData,
    isFetching: isFetchingRoomsByDepartmentIdData,
  } = useGetAllRoomsInAFloorQuery(
    {
      floorId: floorId!,
    },
    { skip: !floorId }
  );

  const roomsByDepartmentIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'floorId',
        columnValue: floorId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'roomName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName={selectName ?? 'roomId'}
      selectTitle="Room"
      data={type === 'general' ? data : floorId ? roomsByDepartmentIdData : []}
      labelKey="roomName"
      valueKey="roomId"
      defaultInputValue={roomName}
      mutationFn={searchRooms}
      isLoading={
        isLoading ||
        isLoadingRoomsByDepartmentIdData ||
        isFetching ||
        isFetchingRoomsByDepartmentIdData
      }
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={floorId}
      specialSearch={
        type === 'specificById' ? roomsByDepartmentIdCriterion : undefined
      }
      selectStyles={selectStyles}
    />
  );
};

export default RoomByFloorSelect;
