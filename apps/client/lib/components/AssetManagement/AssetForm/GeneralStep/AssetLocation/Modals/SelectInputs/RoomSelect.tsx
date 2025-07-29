import React, { useState } from 'react';
import { CSSObjectWithLabel } from 'react-select';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useGetAllRoomsQuery,
  useGetRoomsByDepartmentIdQuery,
  useSearchRoomsMutation,
} from '~/lib/redux/services/location/room.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';

interface RoomSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  departmentId?: number | null;
  selectStyles?: CSSObjectWithLabel;
  selectName?: string;
  selectedOption?: Option | null;
}

const RoomSelect = (props: RoomSelectProps) => {
  const {
    handleSelect,
    type,
    departmentId,
    selectStyles,
    selectName,
    selectedOption,
  } = props;
  const { roomName } = useAppSelector((state) => state.asset.assetForm);
  const [searchRooms] = useSearchRoomsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllRoomsQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: roomsByDepartmentIdData,
    isLoading: isLoadingRoomsByDepartmentIdData,
    isFetching: isFetchingRoomsByDepartmentIdData,
  } = useGetRoomsByDepartmentIdQuery(
    {
      id: departmentId ?? undefined,
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber,
    },
    { skip: !departmentId }
  );

  const roomsByDepartmentIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'departmentId',
        columnValue: departmentId?.toString() as string,
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
      data={
        type === 'general' ? data : departmentId ? roomsByDepartmentIdData : []
      }
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
      fetchKey={departmentId}
      specialSearch={
        type === 'specificById' ? roomsByDepartmentIdCriterion : undefined
      }
      selectStyles={selectStyles}
      selectedOption={selectedOption ?? undefined}
    />
  );
};

export default RoomSelect;
