'use client';

import { Skeleton } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import RoleDetails from '~/lib/components/RoleManagement/RoleDetails';

import { useGetRoleByIdQuery } from '~/lib/redux/services/role.services';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetRoleByIdQuery({ id: params.id! });

  if (isLoading) {
    return <Skeleton width="full" rounded="8px" height="250px" />;
  }
  if (!data?.data) return notFound();

  return <RoleDetails role={data?.data} />;
}
