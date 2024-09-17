import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllRoomsQuery,
  useSearchRoomsMutation,
} from '~/lib/redux/services/asset/location.services';

interface RoomSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const RoomSelect = (props: RoomSelectProps) => {
  const { handleSelect } = props;
  const [searchRoom] = useSearchRoomsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllRoomsQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="roomId"
      selectTitle="Room"
      data={data}
      labelKey="roomName"
      valueKey="roomId"
      mutationFn={searchRoom}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default RoomSelect;
