import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import GeneralAssetTableWrapper from '~/lib/components/AssetManagement/Common/AssetTableWrapper';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import MaintenancePlanTableView from './MaintenancePlanTableView';
import TaskTableView from './TaskTableView';

const CompanyDetailTabs = () => {
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

  const AllTabs = [
    {
      label: 'Asset Management',
      slug: 'assetManagement',
      component: <GeneralAssetTableWrapper />,
    },
    {
      label: 'Task Management',
      slug: 'taskManagement',
      component: <TaskTableView />,
    },
    {
      label: 'Maintenance Plan',
      slug: 'maintenancePlan',
      component: <MaintenancePlanTableView />,
    },
    {
      label: 'Maintenance Schedules',
      slug: 'maintenanceSchedules',
      //   component: <MaintenanceTab />,
    },
    {
      label: 'Approval Flow',
      slug: 'approvalFlow',
      //   component: <HistoryTab />,
    },
    {
      label: 'Template Management',
      slug: 'templateManagement',
      //   component: <DocumentsTab />,
    },
    {
      label: 'Audit Trail',
      slug: 'auditTrail',
      //   component: <RelationshipTab />,
    },
    {
      label: 'User Management',
      slug: 'userManagement',
      //   component: <AssetTickets />,
    },
    {
      label: 'Role Management',
      slug: 'roleManagement',
      //   component: <AssetTickets />,
    },
  ];

  const { updateSearchParam, getSearchParam } = useCustomSearchParams();

  useEffect(() => {
    const tabSelected = getSearchParam('tabSelected');

    if (tabSelected) {
      const foundIndex = AllTabs.findIndex((tab) => tab.slug === tabSelected);

      setTabIndex(foundIndex !== -1 ? foundIndex : 0);
    }
  }, []);
  return (
    <Tabs
      variant="custom"
      width={'full'}
      onChange={(index) => setTabIndex(index)}
      index={tabIndex}
    >
      <TabList>
        {AllTabs.map((item) => (
          <Tab
            paddingBottom="10px"
            key={item.label}
            onClick={() => updateSearchParam('tabSelected', item.slug)}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {AllTabs.map((item, index) => (
          <TabPanel key={item.label}>
            {index === tabIndex && item.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CompanyDetailTabs;
