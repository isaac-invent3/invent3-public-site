'use client';

import { notFound } from 'next/navigation';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import UserForm from '~/lib/components/UserManagement/UserForm';
import { useAppDispatch } from '~/lib/redux/hooks';
import {
  useGetUserByIdQuery,
  useGetUserDocumentsQuery,
  useGetUserProfileByGuidQuery,
} from '~/lib/redux/services/user.services';
import { setUserForm } from '~/lib/redux/slices/UserSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data: user, isLoading: loadingUser } = useGetUserByIdQuery({
    userId: params.id!,
  });
  const { data, isLoading } = useGetUserProfileByGuidQuery(
    { guid: user?.data?.guid! },
    { skip: !user?.data?.userId }
  );
  const { data: userDocuments, isLoading: loadingDocuments } =
    useGetUserDocumentsQuery(
      { userId: params.id!, pageSize: 25 },
      { skip: !data?.data.userId }
    );
  const dispatch = useAppDispatch();

  if (isLoading || loadingDocuments || loadingUser) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const user = data?.data;
    let formDocuments;
    if (userDocuments?.data) {
      formDocuments = userDocuments.data.items?.map((document) => ({
        documentId: document.documentId || null,
        documentName: document.documentName || null,
        base64Document: document.document,
        base64Prefix: document.base64Prefix,
      }));
    }
    dispatch(
      setUserForm({
        userId: user?.userId,
        picture: user?.primaryImage
          ? {
              imageId: null,
              imageName: null,
              base64PhotoImage: user?.primaryImage,
              base64Prefix: user?.primaryImagePrefix,
            }
          : null,
        firstName: user?.firstName,
        middleName: null,
        lastName: user?.lastName,
        dob: null,
        mobileNumber: user?.phoneNumber,
        workEmail: user?.email,
        gender: null,
        countryId: 1,
        stateId: user?.stateId,
        cityId: user?.lgaId,
        cityName: user?.lastName,
        countryName: 'Nigeria',
        stateName: user?.stateName,
        documents: formDocuments ?? [],
        employmentTypeId: null,
        branchId: null,
        branchName: user?.lganame,
        jobTitleId: null,
        jobTitleName: null,
        teamId: null,
        teamName: null,
        userRoleIds: data?.data?.userRoles?.map((item) => item.roleId),
        userRoleNames: data?.data?.userRoles?.map((item) => item.roleName),
        employmentTypeName: null,
        userGroupIds: data?.data?.userGroups?.map((item) => item.groupId),
        userGroupNames: data?.data?.userGroups?.map((item) => item.groupName),
        initialRoleIds: data?.data?.userRoles?.map((item) => item.roleId),
        initialGroupIds: data?.data?.userGroups?.map((item) => item.groupId),
        initialDocumentIds: userDocuments?.data
          ? userDocuments?.data?.items?.map((item) => item.documentId)
          : [],
      })
    );
  }

  return <UserForm type="edit" />;
}
