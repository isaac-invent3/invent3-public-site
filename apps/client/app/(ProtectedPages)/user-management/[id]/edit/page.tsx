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
        countryId: user?.countryId,
        stateId: user?.stateId,
        cityId: user?.lgaId,
        cityName: user?.lganame,
        countryName: user?.countryName,
        stateName: user?.stateName,
        documents: formDocuments ?? [],
        employmentTypeId: user?.employmentType,
        employmentTypeName: null,
        branchId: user?.facilityId,
        branchName: user?.facilityName,
        jobTitleId: user?.designationId,
        jobTitleName: user?.designationName,
        teamIds: data?.data?.userTeams?.map((item) => item.teamId),
        teamNames: data?.data?.userTeams?.map((item) => item.name),
        userRoleIds: data?.data?.userRoles?.map((item) => item.roleId),
        userRoleNames: data?.data?.userRoles?.map((item) => item.roleName),
        userGroupIds: data?.data?.userGroups?.map((item) => item.groupId),
        userGroupNames: data?.data?.userGroups?.map((item) => item.groupName),
        initialRoleIds: data?.data?.userRoles?.map((item) => item.roleId),
        initialGroupIds: data?.data?.userGroups?.map((item) => item.groupId),
        initialDocumentIds: userDocuments?.data
          ? userDocuments?.data?.items?.map((item) => item.documentId)
          : [],
        initialTeamIds: data?.data?.userTeams?.map((item) => item.teamId),
      })
    );
  }

  return <UserForm type="edit" />;
}
