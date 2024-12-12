import {
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import TaskListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskListView';
import { dateFormatter } from '~/lib/utils/Formatters';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

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
      value: '2024-12-03T10:51:51.847Z',
    },
    {
      label: 'Next Maintenance Run',
      value: '2024-07-03T10:51:51.847Z',
    },
    {
      label: 'Schedule End Date',
      value: null,
    },
  ];

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
        <SimpleGrid columns={3} gap="32px" width="80%">
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
        </SimpleGrid>
        <Text
          fontWeight={700}
          textDecoration="underline"
          color="primary.500"
          role="button"
          onClick={onOpen}
          whiteSpace="nowrap"
        >
          View Tasks
        </Text>
      </HStack>
      {isOpen && (
        <TaskListView
          isOpen={isOpen}
          onClose={onClose}
          scheduleId={data?.scheduleId}
          showPopover={!isPartOfDefaultPlan}
        />
      )}
    </>
  );
};

export default SectionTwo;
