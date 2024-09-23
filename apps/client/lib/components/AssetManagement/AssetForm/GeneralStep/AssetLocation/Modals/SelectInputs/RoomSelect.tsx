import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllRoomsQuery,
  useGetRoomsByDepartmentIdQuery,
  useSearchRoomsMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface RoomSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  departmentId?: number | null;
}

const RoomSelect = (props: RoomSelectProps) => {
  const { handleSelect, type, departmentId } = props;
  const [searchRooms] = useSearchRoomsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllRoomsQuery(
    {
      pageSize: 25,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: roomsByDepartmentIdData,
    isLoading: isLoadingRoomsByDepartmentIdData,
  } = useGetRoomsByDepartmentIdQuery(
    {
      id: departmentId,
      pageSize: 25,
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
      selectName="roomId"
      selectTitle="Room"
      data={
        type === 'general' ? data : departmentId ? roomsByDepartmentIdData : []
      }
      labelKey="roomName"
      valueKey="roomId"
      mutationFn={searchRooms}
      isLoading={isLoading || isLoadingRoomsByDepartmentIdData}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={departmentId}
      specialSearch={
        type === 'specificById' ? roomsByDepartmentIdCriterion : undefined
      }
    />
  );
};

export default RoomSelect;
