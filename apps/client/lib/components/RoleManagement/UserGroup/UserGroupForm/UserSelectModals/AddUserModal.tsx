import { OPERATORS } from '@repo/constants';
import { Option } from '@repo/interfaces';
import { generateSearchCriteria } from '@repo/utils';
import React, { useCallback, useEffect, useState } from 'react';
import UserSelectSecondaryModal from '~/lib/components/Common/Modals/UserSelectModal/UserSelectSecondaryModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { User } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetAllActiveUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { addNewUserGroupUser } from '~/lib/redux/slices/RoleSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCustomAddUser?: (user: User) => void;
}
const AddUserModal = (props: AddUserModalProps) => {
  const { isOpen, onClose, handleCustomAddUser } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const [searchUsers, { isLoading: searchLoading }] = useSearchUsersMutation(
    {}
  );
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllActiveUsersQuery({
    pageSize: pageSize,
    pageNumber,
  });
  const { handleSubmit } = useCustomMutation();

  const handleSearch = useCallback(async () => {
    const { orCriterion } = generateSearchCriteria(search, {}, {}, [
      'firstName',
      'lastName',
    ]);
    const payload = {
      pageNumber,
      pageSize,
      orCriterion,
    };

    if (orCriterion.length > 0) {
      const response = await handleSubmit(searchUsers, payload, '');
      if (response?.data) {
        setUsers(response?.data?.data?.items);
      }
    }
  }, [searchUsers, search, pageNumber, pageSize]);

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
        if (handleCustomAddUser) {
          handleCustomAddUser(user);
        } else {
          dispatch(addNewUserGroupUser(user));
        }
      }}
    />
  );
};

export default AddUserModal;
