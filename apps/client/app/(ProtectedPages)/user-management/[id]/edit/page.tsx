'use client';

import { notFound } from 'next/navigation';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import UserForm from '~/lib/components/UserManagement/UserForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetUserByIdQuery,
  useGetUserDocumentsQuery,
} from '~/lib/redux/services/user.services';
import { setUserForm } from '~/lib/redux/slices/UserSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetUserByIdQuery({ userId: params.id! });
  const { data: userDocuments, isLoading: loadingDocuments } =
    useGetUserDocumentsQuery(
      { userId: params.id!, pageSize: 25 },
      { skip: !data?.data.userId }
    );
  const dispatch = useAppDispatch();

  if (isLoading || loadingDocuments) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const user = data?.data;
    let formDocuments;
    if (userDocuments?.data) {
      formDocuments = userDocuments.data.items.map((document) => ({
        documentId: document.documentId || null,
        documentName: document.documentName || null,
        base64Document: document.document,
        base64Prefix: document.base64Prefix,
      }));
    }
    dispatch(
      setUserForm({
        picture: null,
        firstName: user?.firstName,
        middleName: null,
        lastName: user?.lastName,
        dob: user?.dateOfBirth
          ? dateFormatter(user?.dateOfBirth, 'DD/MM/YYYY')
          : null,
        mobileNumber: user?.phoneNumber,
        workEmail: user?.personalEmail,
        gender: null,
        countryId: null,
        stateId: null,
        cityId: null,
        cityName: null,
        countryName: null,
        stateName: null,
        documents: formDocuments ?? [],
        employmentTypeId: null,
        branchId: null,
        branchName: null,
        jobTitleId: null,
        jobTitleName: null,
        teamId: null,
        teamName: null,
        userRoleIds: data?.data.userRoles.map((item) => item.roleId),
        userRoleNames: data?.data.userRoles.map((item) => item.roleName),
        employmentTypeName: null,
        userGroupIds: data?.data.userGroups.map((item) => item.groupId),
        userGroupNames: data?.data.userGroups.map((item) => item.groupName),
        initialRoleIds: data?.data.userRoles.map((item) => item.roleId),
        initialGroupIds: data?.data.userGroups.map((item) => item.groupId),
        initialDocumentIds: userDocuments?.data
          ? userDocuments?.data?.items.map((item) => item.documentId)
          : [],
      })
    );
  }

  return <UserForm type="edit" />;
}
