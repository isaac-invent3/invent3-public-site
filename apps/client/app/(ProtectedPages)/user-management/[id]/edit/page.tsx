'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import UserForm from '~/lib/components/UserManagement/UserForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetUserByIdQuery } from '~/lib/redux/services/user.services';
import { setUserForm } from '~/lib/redux/slices/UserSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetUserByIdQuery({ userId: params.id! });
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const user = data?.data;
    dispatch(
      setUserForm({
        picture: null,
        firstName: user?.firstName,
        middleName: user?.firstName,
        lastName: null,
        dob: user
          ? dateFormatter(new Date().toISOString(), 'DD/MM/YYYY')
          : null,
        mobileNumber: null,
        personalEmail: null,
        workEmail: null,
        gender: null,
        address1: null,
        address2: null,
        countryId: null,
        stateId: null,
        cityId: null,
        cityName: null,
        countryName: null,
        stateName: null,
        postalCode: null,
        documents: [],
        employmentTypeId: null,
        branchId: null,
        branchName: null,
        jobTitleId: null,
        jobTitleName: null,
        teamId: null,
        teamName: null,
        userRoleIds: [],
        userRoleNames: [],
        employmentTypeName: null,
        userGroupIds: [],
        userGroupNames: [],
      })
    );
  }

  return <UserForm type="edit" />;
}
