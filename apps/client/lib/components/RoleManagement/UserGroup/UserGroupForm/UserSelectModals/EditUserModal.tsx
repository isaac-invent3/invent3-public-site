import React, { useEffect, useState } from 'react';
import UserSelectSecondaryModal from '~/lib/components/Common/Modals/UserSelectModal/UserSelectSecondaryModal';

import { User } from '~/lib/interfaces/user.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllActiveUsersQuery } from '~/lib/redux/services/user.services';
import { deleteUserGroupUser } from '~/lib/redux/slices/RoleSlice';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const EditUserModal = (props: EditUserModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const { newlyAddedUsers } = useAppSelector(
    (state) => state.role.userGroupFormDetails
  );
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber] = useState(1);
  const { isLoading } = useGetAllActiveUsersQuery({
    pageSize: pageSize,
    pageNumber,
  });

  //   useEffect(() => {
  //     if (data?.data) setUsers(data?.data.items);
  //   }, [data]);

  useEffect(() => {
    setUsers(newlyAddedUsers);
  }, [newlyAddedUsers]);

  return (
    <UserSelectSecondaryModal
      isOpen={isOpen}
      onClose={onClose}
      type="edit"
      externalUsers={users}
      externalSearch={search}
      setExternalSearch={setSearch}
      externalLoading={isLoading}
      handleSelectUser={(user) => {
        dispatch(deleteUserGroupUser(user.userId));
      }}
    />
  );
};

export default EditUserModal;
