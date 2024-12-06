import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import TaskListView from '~/lib/components/TaskManagement/Drawers/TaskListDrawer/TaskListView';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
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
}
interface MaintenanceScheduleCardProps {
  data: GenericScheduleData;
  isPartOfDefaultPlan?: boolean;
}
const MaintenanceScheduleCard = (props: MaintenanceScheduleCardProps) => {
  const { data, isPartOfDefaultPlan = false } = props;
  const endTime = data?.durationInHours
    ? moment(data?.scheduledDate).add(data?.durationInHours, 'hours') // Add the duration if available
    : null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Grid
        templateAreas={`"description contact status"`}
        gridTemplateRows="auto auto auto"
        gridTemplateColumns="30% 1fr 1fr"
        height="full"
        width="full"
        p="8px"
        border="1px solid #BBBBBB80"
        rounded="8px"
        justifyContent="space-between"
        gridColumnGap="81px"
        alignItems="flex-start"
      >
        {/* Description Starts Here */}
        <GridItem area="description">
          <HStack spacing="22px" alignItems="flex-start">
            <VStack spacing="2px">
              <Text color="neutral.600" size="md" fontWeight={500}>
                {data?.scheduledDate
                  ? dateFormatter(data?.scheduledDate, 'ddd')
                  : 'N/A'}
              </Text>

              <Text
                color="neutral.800"
                fontSize="24px"
                lineHeight="28.51px"
                fontWeight={800}
              >
                {data?.scheduledDate
                  ? dateFormatter(data?.scheduledDate, 'DD')
                  : 'N/A'}
              </Text>
              <Text
                color="neutral.800"
                fontWeight={800}
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                {data?.scheduledDate
                  ? dateFormatter(data?.scheduledDate, 'MMM')
                  : 'N/A'}
              </Text>
            </VStack>
            <VStack spacing="8px" alignItems="flex-start">
              <VStack alignItems="flex-start" spacing="2px">
                <Text color="neutral.800" size="lg" fontWeight={800}>
                  {data?.scheduleName}
                </Text>
                <Text color="neutral.600">{data?.maintenanceType}</Text>
              </VStack>
              <VStack alignItems="flex-start" spacing="2px">
                <Text color="neutral.600">
                  {data?.scheduledDate
                    ? dateFormatter(data?.scheduledDate, 'HH:mm')
                    : 'N/A'}{' '}
                  - {endTime ? endTime.format('HH:mm') : 'N/A'}
                </Text>
                <Text color="neutral.600">
                  Created By: {data?.createdBy ?? 'N/A'}
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </GridItem>
        {/* Description Ends Here */}
        {/* Contact Starts Here */}
        <GridItem area="contact">
          <VStack spacing="4px" alignItems="flex-start">
            <Text size="md" color="black">
              Contact Person
            </Text>
            {[
              data?.contactPerson,
              data?.contactPersonPhoneNo,
              data?.contactPersonEmail,
            ].filter(Boolean).length >= 1 ? (
              <VStack spacing="4px" alignItems="flex-start">
                <Text size="md" color="neutral.600">
                  {data?.contactPerson ?? 'N/A'}
                </Text>
                <Text size="md" color="neutral.600">
                  {data?.contactPersonPhoneNo ?? 'N/A'}
                </Text>
                <Text size="md" color="neutral.600">
                  {data?.contactPersonEmail ?? 'N/A'}
                </Text>
              </VStack>
            ) : (
              <Text size="md" color="neutral.600">
                N/A
              </Text>
            )}
          </VStack>
        </GridItem>
        {/* Contact Ends Here */}
        {/* Status and Action Button */}
        <GridItem area="status" height="full">
          <Flex
            direction="column"
            height="full"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <VStack spacing="4px" alignItems="flex-start">
              <Text color="neutral.700">Status:</Text>
              <Text
                fontWeight={800}
                color={MaintenanceColorCode[data?.currentStatus as 'Completed']}
              >
                {data?.currentStatus ?? 'N/A'}
              </Text>
            </VStack>
            <Text
              color="primary.500"
              fontWeight={700}
              textDecoration="underline"
              cursor="pointer"
              onClick={() => onOpen()}
            >
              View Schedule Tasks
            </Text>
          </Flex>
        </GridItem>
        {/* Status and Action Button */}
      </Grid>
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
