import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface EmployeeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultName?: string;
}

const EmployeeSelect = (props: EmployeeSelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultName } = props;
  const [searchUser] = useSearchUsersMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="email"
      valueKey="userId"
      mutationFn={searchUser}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultName}
    />
  );
};

export default EmployeeSelect;
