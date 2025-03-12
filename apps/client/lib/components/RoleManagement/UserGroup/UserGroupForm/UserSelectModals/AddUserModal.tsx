import { OPERATORS } from '@repo/constants';
import React, { useCallback, useEffect, useState } from 'react';
import UserSelectSecondaryModal from '~/lib/components/Common/Modals/UserSelectModal/UserSelectSecondaryModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { User } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { addNewUserGroupUser } from '~/lib/redux/slices/RoleSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddUserModal = (props: AddUserModalProps) => {
  const { isOpen, onClose } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const [searchUsers, { isLoading: searchLoading }] = useSearchUsersMutation(
    {}
  );
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllUsersQuery({
    pageSize: pageSize,
    pageNumber,
  });
  const { handleSubmit } = useCustomMutation();

  const searchCriterion = {
    ...(search && {
      orCriterion: [
        ...(search
          ? [
              [
                {
                  columnName: 'firstName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
        ...(search
          ? [
              [
                {
                  columnName: 'lastName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchUsers, searchCriterion, '');
    if (response?.data?.data) setUsers(response?.data?.data.items);
  }, [searchUsers, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
    if (data) {
      setUsers(data?.data?.items);
    }
  }, [search]);

  useEffect(() => {
    if (data?.data) setUsers(data?.data.items);
  }, [data]);

  return (
    <UserSelectSecondaryModal
      isOpen={isOpen}
      onClose={onClose}
      type="select"
      externalUsers={users}
      externalSearch={search}
      setExternalSearch={setSearch}
      externalLoading={isLoading}
      externalSearchLoading={searchLoading}
      handleSelectUser={(user) => {
        dispatch(addNewUserGroupUser(user));
      }}
    />
  );
};

export default AddUserModal;
