import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllActiveUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface UserSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultName?: string;
}

const UserSelect = (props: UserSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultName } = props;
  const [searchUser] = useSearchUsersMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllActiveUsersQuery({
    pageSize: DEFAULT_PAGE_SIZE,
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
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultName}
    />
  );
};

export default UserSelect;
