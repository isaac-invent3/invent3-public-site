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
  defaultName?: string | null;
  showTitleAfterSelect?: boolean;
}

const UserSelect = (props: UserSelectProps) => {
  const {
    handleSelect,
    selectName,
    selectTitle,
    defaultName,
    showTitleAfterSelect = true,
  } = props;
  const [searchUsers] = useSearchUsersMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllActiveUsersQuery({
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
      defaultInputValue={defaultName}
      mutationFn={searchUsers}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      showTitleAfterSelect={showTitleAfterSelect}
    />
  );
};

export default UserSelect;
