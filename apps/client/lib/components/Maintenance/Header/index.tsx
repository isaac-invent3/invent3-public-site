import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '~/lib/components/UI/PageHeader';
import PlanTemplateModal from '../Plans/PlanTemplateModal';
import ScheduleTemplateModal from '../Schedules/ScheduleTemplateModal';
import ActionButtonPopover from '../../UI/ActionButtonsPopover';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Maintenance',
    route: '#',
  },
];

const Header = () => {
  const searchParams = useSearchParams();
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

  // Retrieve the `tab` parameter from URL on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setTabName(tab);
    } else {
      setTabName('Plans');
    }
  }, [searchParams]);

  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Maintenance</PageHeader>
        {tabName?.toLowerCase() === 'plans' && (
          <ActionButtonPopover
            onOpenTemplateModal={onOpenPlanTemplate}
            newRoute="/maintenance/plans/add"
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
        {tabName?.toLowerCase() === 'schedules' && (
          <ActionButtonPopover
            onOpenTemplateModal={onOpenScheduleTemplate}
            newRoute="/maintenance/schedules/add"
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
    </VStack>
  );
};

export default Header;
