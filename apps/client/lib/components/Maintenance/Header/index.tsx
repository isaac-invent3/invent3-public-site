import { HStack, useDisclosure } from '@chakra-ui/react';
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
  const canCreatePlan = usePermissionAccess('maintenance_plan:create');
  const canCreateSchedule = usePermissionAccess('maintenance_schedule:create');

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
    <HStack width="full" justifyContent="space-between">
      <PageHeader>Maintenance</PageHeader>
      {tabName?.toLowerCase() === 'plans' && canCreatePlan && (
        <ActionButtonPopover
          onOpenTemplateModal={onOpenPlanTemplate}
          newRoute={`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}/add`}
          buttonLabel="Add New Plan"
          linkLabel="Create a New Plan"
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
          newRoute={`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/add`}
          buttonLabel="Add New Schedule"
          linkLabel="Create a New Schedule"
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
    </HStack>
  );
};

export default Header;
