import {
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import TaskListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskListView';
import useSlugAction from '~/lib/hooks/useSlugAction';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

interface SectionTwoProps {
  data: MaintenanceSchedule;
  isPartOfDefaultPlan?: boolean;
}
const SectionTwo = (props: SectionTwoProps) => {
  const { data, isPartOfDefaultPlan = false } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dateInfo = [
    {
      label: 'Last Maintenance Run',
      value: data?.lastMaintenanceRun,
    },
    {
      label: 'Next Maintenance Run',
      value: data?.nextMaintenanceRun,
    },
    {
      label: 'Schedule End Date',
      value: data?.endDate,
    },
  ];

  const { closeAction, openAction } = useSlugAction({
    slugAction: onOpen,
    slugName: SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULES.slug,
    slugComparator: data?.scheduleId,
    onCloseHandler: onClose,
  });

  return (
    <>
      <HStack
        width="full"
        justifyContent="space-between"
        spacing="43px"
        pt="16px"
        pb="18px"
        pl="8px"
        pr="16px"
        bgColor="neutral.600"
      >
        <SimpleGrid
          columns={{ base: 2, lg: 4 }}
          gap={{ base: '16px', lg: '32px' }}
          width="100%"
        >
          {dateInfo.map((item, index) => (
            <VStack
              width="full"
              alignItems="flex-start"
              spacing="4px"
              key={index}
            >
              <Text color="neutral.300" fontWeight={700}>
                {item.label}
              </Text>
              <Text color="white" fontWeight={800}>
                {item.value ? dateFormatter(item.value, 'Do MMM, YYYY') : 'N/A'}
              </Text>
            </VStack>
          ))}
          <Text
            fontWeight={700}
            textDecoration="underline"
            color="primary.500"
            role="button"
            onClick={openAction}
            whiteSpace="nowrap"
            justifySelf={{ lg: 'end' }}
          >
            View Tasks
          </Text>
        </SimpleGrid>
      </HStack>
      {isOpen && (
        <TaskListView
          isOpen={isOpen}
          onClose={closeAction}
          scheduleId={data?.scheduleId}
          showPopover={!isPartOfDefaultPlan}
        />
      )}
    </>
  );
};

export default SectionTwo;
