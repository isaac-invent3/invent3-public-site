import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import TaskListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskListView';
import { dateFormatter } from '~/lib/utils/Formatters';

interface GenericScheduleData {
  scheduleId: number;
  scheduledDate: string;
  scheduleName: string;
  durationInHours: number;
  contactPerson: string;
  contactPersonPhoneNo: string;
  contactPersonEmail: string;
  maintenanceType: string;
  currentStatus: string;
  createdBy: string;
  sla: number;
}
interface MaintenanceScheduleCardProps {
  data: GenericScheduleData;
  isPartOfDefaultPlan?: boolean;
}
const MaintenanceScheduleCard = (props: MaintenanceScheduleCardProps) => {
  const { data, isPartOfDefaultPlan = false } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        height="full"
        width="full"
        p="8px"
        border="1px solid #BBBBBB80"
        rounded="8px"
        justifyContent="space-between"
        alignItems="flex-start"
        position="relative"
      >
        {/* Date Starts Here */}
        <VStack spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Start Date
          </Text>
          <VStack alignItems="flex-start" spacing="4px" maxW="140px">
            <Text color="neutral.800" fontWeight={800} whiteSpace="nowrap">
              {data?.scheduledDate
                ? dateFormatter(data?.scheduledDate, 'Do MMM, YYYY hh:mmA')
                : 'N/A'}
            </Text>
            <Text color="neutral.600">
              Monthly on day 29, until 10th Feb, 2025
            </Text>
          </VStack>
        </VStack>
        {/* Date Ends Here */}

        {/* Description Starts Here */}
        <VStack spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Title
          </Text>
          <VStack alignItems="flex-start" spacing="4px">
            <Text color="neutral.800" size="md" fontWeight={800}>
              {data?.scheduleName}
            </Text>
            <Text color="neutral.600">{data?.maintenanceType}</Text>
          </VStack>
        </VStack>
        {/* Description Ends Here */}
        {/* Contact Starts Here */}
        <VStack spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Engineer / Contact Person
          </Text>
          {[
            data?.contactPerson,
            data?.contactPersonPhoneNo,
            data?.contactPersonEmail,
          ].filter(Boolean).length >= 1 ? (
            <VStack spacing="4px" alignItems="flex-start">
              {data?.contactPerson && (
                <Text size="md" fontWeight={800} color="neutral.800">
                  {data?.contactPerson}
                </Text>
              )}
              {data?.contactPersonPhoneNo && (
                <Text color="neutral.800">{data?.contactPersonPhoneNo}</Text>
              )}
              {data?.contactPersonEmail && (
                <Text color="neutral.800">{data?.contactPersonEmail}</Text>
              )}
            </VStack>
          ) : (
            <Text color="neutral.600">N/A</Text>
          )}
        </VStack>
        {/* Contact Ends Here */}
        {/* SLA and Action Button */}
        <Flex
          direction="column"
          height="full"
          justifyContent="space-between"
          alignItems="flex-start"
          width="min-content"
        >
          <VStack spacing="8px" alignItems="flex-start" minW="70px">
            <Text color="neutral.600" fontWeight={700}>
              SLA:
            </Text>
            <Text fontWeight={800}>
              {data?.sla
                ? `${data?.sla} Hour ${data?.sla > 1 ? 's' : ''}`
                : 'N/A'}
            </Text>
          </VStack>
          <Text
            color="blue.500"
            fontWeight={700}
            textDecoration="underline"
            cursor="pointer"
            onClick={() => onOpen()}
            position="absolute"
            bottom={0}
            right={0}
            mr="8px"
            mb="8px"
            minW="70px"
          >
            View Tasks
          </Text>
        </Flex>
        {/* Status and Action Button */}
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

export default MaintenanceScheduleCard;
