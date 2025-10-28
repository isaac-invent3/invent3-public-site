'use client';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import PageHeader from '../UI/PageHeader';
import GeneralTab from './GeneralTab';
import SecurityAuthenticationTab from './SecurityAuthenticationTab';
import NotificationsTab from './NotificationsTab';
import AuditTab from './AuditTab';
import ComplianceTab from './ComplianceTab';
import IntegrationTab from './IntegrationTab';
import DataImportExportTab from './DataImportExportTab';
import BMSData from './BMSData';
import ApprovalWorkflow from './ApprovalWorkflow';
import SLAConfiguration from './SLAConfiguration';
import { useSession } from 'next-auth/react';
import { useGetSettingsQuery } from '~/lib/redux/services/utility.services';
import { setSettings } from '~/lib/redux/slices/SettingsSlice';
import { useAppDispatch } from '~/lib/redux/hooks';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import DynamicTabs from '../UI/DynamicTab';
import LifeCycleStageTransition from './LifeCycleStageTransition';

const ALL_TABS = [
  { name: 'General Settings', component: <GeneralTab /> },
  {
    name: 'Security & Authentication',
    component: <SecurityAuthenticationTab />,
  },
  { name: 'Notification', component: <NotificationsTab /> },
  { name: 'Audit & Logging', component: <AuditTab /> },
  { name: 'Integration', component: <IntegrationTab /> },
  { name: 'Data Import & Export', component: <DataImportExportTab /> },
  { name: 'Compliance', component: <ComplianceTab /> },
  { name: 'BMS Data', component: <BMSData /> },
  { name: 'Approval Workflow', component: <ApprovalWorkflow /> },
  { name: 'SLA Configuration', component: <SLAConfiguration /> },
  {
    name: 'Lifecycle Transition Rules',
    component: <LifeCycleStageTransition />,
  },
];

const AdminSettings = () => {
  const { getSearchParam, updateSearchParam } = useCustomSearchParams();
  const tabParam = getSearchParam('tab');
  const session = useSession();
  const dispatch = useAppDispatch();

  const { data: settings, isLoading } = useGetSettingsQuery(
    { companyId: session?.data?.user?.companyId! },
    { skip: !session?.data?.user?.companyId }
  );

  React.useEffect(() => {
    if (settings) dispatch(setSettings(settings.data));
  }, [settings]);

  return (
    <Flex width="full" direction="column" pb="40px">
      <Flex px={{ base: '16px', md: 0 }}>
        <PageHeader>Settings</PageHeader>
      </Flex>

      <Flex px={{ base: '16px', md: 0 }} mt="51px">
        <DynamicTabs
          tabs={ALL_TABS}
          activeTabParam={tabParam}
          onTabChange={(name) => updateSearchParam('tab', name)}
          isLoading={isLoading}
        />
      </Flex>
    </Flex>
  );
};

export default AdminSettings;
