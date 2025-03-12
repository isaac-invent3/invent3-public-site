'use client';

import { notFound } from 'next/navigation';
import UserGroupForm from '~/lib/components/RoleManagement/UserGroup/UserGroupForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetUserGroupByIdQuery } from '~/lib/redux/services/user.services';
import { updateUserGroupFormDetails } from '~/lib/redux/slices/RoleSlice';

export default function Page({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserGroupByIdQuery({ groupId: params.id! });

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (data) {
    dispatch(
      updateUserGroupFormDetails({
        groupId: data?.data?.groupId,
        groupName: data?.data?.groupName,
        formUserGroupRoleIds: data?.data?.groupRoles.map((item) => item.roleId),
        initialUserGroupRoleIds: data?.data?.groupRoles.map(
          (item) => item.roleId
        ),
        users: data?.data?.groupUsers,
        newlyAddedUsers: data?.data?.groupUsers,
      })
    );
  }

  if (!data?.data) return notFound();

  return <UserGroupForm type="edit" />;
}
