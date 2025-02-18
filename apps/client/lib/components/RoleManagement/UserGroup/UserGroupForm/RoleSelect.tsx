import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllRolesQuery,
  useSearchRolesMutation,
} from '~/lib/redux/services/role.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface RoleSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option | Option[]) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
  customProps?: { [name: string]: any };
}

const RoleSelect = (props: RoleSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchRole] = useSearchRolesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllRolesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="roleName"
      valueKey="roleId"
      mutationFn={searchRole}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
      isMultiSelect
    />
  );
};

export default RoleSelect;
