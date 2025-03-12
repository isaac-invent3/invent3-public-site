import { Stack, useDisclosure } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import PlanTemplateModal from '../Plans/PlanTemplateModal';
import ScheduleTemplateModal from '../Schedules/ScheduleTemplateModal';
import ActionButtonPopover from '../../UI/ActionButtonsPopover';
import { ROUTES } from '~/lib/utils/constants';
import usePermissionAccess from '~/lib/hooks/useRoleAccess';

const Header = () => {
  const pathname = usePathname();
  const [tabName, setTabName] = useState<string | null>(null);
  const {
    isOpen: isOpenPlanTemplate,
    onClose: onClosePlanTemplate,
    onOpen: onOpenPlanTemplate,
  } = useDisclosure();
  const {
    isOpen: isOpenScheduleTemplate,
    onClose: onCloseScheduleTemplate,
    onOpen: onOpenScheduleTemplate,
  } = useDisclosure();
  const canCreatePlan = usePermissionAccess('maintenance:plan_create');
  const canCreateSchedule = usePermissionAccess('maintenance:schedule_create');

  useEffect(() => {
    // Define a mapping for the paths to tab names
    const tabMapping: Record<string, string> = {
      plans: 'Plans',
      maintenance: 'Plans',
      schedules: 'Schedules',
    };

    // Get the last segment of the pathname
    const lastPath = pathname.split('/').pop() || ''; // Add fallback to an empty string in case `pop()` is undefined

    // Set the tab name based on the mapping or default to null
    setTabName(tabMapping[lastPath] ?? null);
  }, [pathname]);

  return (
    <Stack
      width="full"
      justifyContent="space-between"
      spacing="10px"
      direction={{ base: 'column', md: 'row' }}
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Maintenance</PageHeader>
      {tabName?.toLowerCase() === 'plans' && canCreatePlan && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpenPlanTemplate}
          actions={[
            {
              label: 'Create a New Plan',
              route: `/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}/add`,
            },
          ]}
          buttonLabel="Add New Plan"
          modalLabel="Create From Template"
        >
          {isOpenPlanTemplate && (
            <PlanTemplateModal
              isOpen={isOpenPlanTemplate}
              onClose={onClosePlanTemplate}
            />
          )}
        </ActionButtonPopover>
      )}
      {tabName?.toLowerCase() === 'schedules' && canCreateSchedule && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpenScheduleTemplate}
          actions={[
            {
              label: 'Create a New Schedule',
              route: `/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/add`,
            },
          ]}
          buttonLabel="Add New Schedule"
          modalLabel="Create From Template"
        >
          {isOpenScheduleTemplate && (
            <ScheduleTemplateModal
              isOpen={isOpenScheduleTemplate}
              onClose={onCloseScheduleTemplate}
            />
          )}
        </ActionButtonPopover>
      )}
    </Stack>
  );
};

export default Header;
