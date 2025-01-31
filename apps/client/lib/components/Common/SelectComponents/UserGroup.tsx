import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useSearchRolesMutation } from '~/lib/redux/services/role.services';
import { useGetAllUserGroupsQuery } from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface UserGroupSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const UserGroupSelect = (props: UserGroupSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchRoles] = useSearchRolesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllUserGroupsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="userId"
      valueKey="groupId"
      mutationFn={searchRoles}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
      isMultiSelect
    />
  );
};

export default UserGroupSelect;
