'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import OperationManager from './OperationManager';
import { useSearchParams } from 'next/navigation';
import { DashboardView } from '~/lib/interfaces/dashboard.interfaces';
import FrontDesk from './FrontDesk';
import FieldEngineer from './FieldEngineer';
import ClientAdmin from './ClientAdmin';
import Executive from './Executive';
import SuperAdmin from './SuperAdmin';
import { useSession } from 'next-auth/react';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import ThirdParty from './ThirdParty';

const ROLE_PRIORITY = [
  ROLE_IDS_ENUM.SUPER_ADMIN,
  ROLE_IDS_ENUM.THIRD_PARTY,
  ROLE_IDS_ENUM.CLIENT_ADMIN,
  ROLE_IDS_ENUM.EXECUTIVE,
  ROLE_IDS_ENUM.OPERATION_MANAGER,
  ROLE_IDS_ENUM.FIELD_ENGINEER,
  ROLE_IDS_ENUM.FRONT_DESK,
];

const ROLE_VIEW_MAPPING: Record<number, DashboardView> = {
  [ROLE_IDS_ENUM.SUPER_ADMIN]: 'super_admin',
  [ROLE_IDS_ENUM.CLIENT_ADMIN]: 'client_admin',
  [ROLE_IDS_ENUM.EXECUTIVE]: 'executive',
  [ROLE_IDS_ENUM.OPERATION_MANAGER]: 'operation_manager',
  [ROLE_IDS_ENUM.FIELD_ENGINEER]: 'field_engineer',
  [ROLE_IDS_ENUM.FRONT_DESK]: 'front_desk',
};

const DASHBOARD_COMPONENTS: Record<DashboardView, React.FC> = {
  super_admin: SuperAdmin,
  third_party: ThirdParty,
  client_admin: ClientAdmin,
  executive: Executive,
  operation_manager: OperationManager,
  field_engineer: FieldEngineer,
  front_desk: FrontDesk,
};

const Dashboard = () => {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const session = useSession();
  const roleIds = session?.data?.user?.roleIds ?? [];
  const { updateSearchParam } = useCustomSearchParams();

  // Find the first matching role from the priority list
  const fallbackRoleId = ROLE_PRIORITY.find((role) => roleIds.includes(role));

  // Map the roleId to the corresponding view
  const fallbackView: DashboardView | undefined = fallbackRoleId
    ? ROLE_VIEW_MAPPING[fallbackRoleId]
    : undefined;

  // Check if the search param matches a valid dashboard view and is part of the user's roles
  const effectiveView: DashboardView | undefined =
    viewParam &&
    isDashboardView(viewParam) &&
    roleIds.includes(getRoleIdByView(viewParam)!)
      ? viewParam
      : fallbackView;

  //Replace the view query to a valid view
  useEffect(() => {
    if (effectiveView) {
      updateSearchParam('view', effectiveView);
    }
  }, [effectiveView]);

  // If no valid view, return an empty flex container
  if (!effectiveView) {
    return <Flex />;
  }

  // Render the appropriate dashboard component based on the resolved view
  const DashboardComponent = DASHBOARD_COMPONENTS[effectiveView];
  return <DashboardComponent />;
};

// Helper function to validate if the given value is a valid DashboardView
const isDashboardView = (value: string | null): value is DashboardView => {
  const DASHBOARD_VIEWS: Set<DashboardView> = new Set([
    'super_admin',
    'client_admin',
    'executive',
    'operation_manager',
    'field_engineer',
    'third_party',
    'front_desk',
  ]);
  return value !== null && DASHBOARD_VIEWS.has(value as DashboardView);
};

// Helper function to get the roleId from a dashboard view
const getRoleIdByView = (view: DashboardView): number | undefined =>
  Object.entries(ROLE_VIEW_MAPPING)
    // eslint-disable-next-line no-unused-vars
    .find(([_, v]) => v === view)?.[0]
    ? Number(
        Object.entries(ROLE_VIEW_MAPPING)
          // eslint-disable-next-line no-unused-vars
          .find(([_, v]) => v === view)?.[0]
      )
    : undefined;

export default Dashboard;
