import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';

interface UserSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
}

const UserSelect = (props: UserSelectProps) => {
  const { handleSelect, selectName, selectTitle } = props;
  const [searchUser] = useSearchUsersMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey={['firstName', 'lastName']}
      valueKey="userId"
      mutationFn={searchUser}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default UserSelect;
