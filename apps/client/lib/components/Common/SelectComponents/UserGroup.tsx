import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllUserGroupsInfoHeaderQuery,
  useSearchUserGroupMutation,
} from '~/lib/redux/services/user.services';

interface UserGroupSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const UserGroupSelect = (props: UserGroupSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchRoles] = useSearchUserGroupMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllUserGroupsInfoHeaderQuery({
    pageSize: 50,
    pageNumber,
  });

  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="groupName"
      valueKey="groupId"
      mutationFn={searchRoles}
      isLoading={isLoading || isFetching}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
      isMultiSelect
    />
  );
};

export default UserGroupSelect;
