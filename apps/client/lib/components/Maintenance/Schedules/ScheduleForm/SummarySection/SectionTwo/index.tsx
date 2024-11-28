import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import TaskListTable from '../../FormSection/SectionTwo/Tasks/ListDrawer/TaskListTable';
import InfoCard from '~/lib/components/UI/InfoCard';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';

interface ISectionTwo {
  formDetails: ScheduleFormDetails;
  showTasks?: boolean;
}
const SectionTwo = (props: ISectionTwo) => {
  const { formDetails, showTasks = true } = props;
  const contentOne = [
    {
      label: 'Schedule Title',
      value: formDetails.name,
    },
    {
      label: 'Type',
      value: formDetails.typeName,
    },
  ];

  const dateFields = [
    {
      label: 'Start Date',
      value: formDetails.scheduledDate,
    },
  ];

  return (
    <Flex width="full" gap="32px" direction="column">
      <Grid
        templateColumns="repeat(4, 1fr)"
        rowGap="32px"
        columnGap={0}
        width="full"
      >
        {/* Row 1 Starts */}
        <GridItem colSpan={2} width="full">
          <HStack width="full" alignItems="flex-start" spacing={0}>
            {contentOne.map((item, index) => (
              <VStack
                alignItems="flex-start"
                width="full"
                spacing="8px"
                key={index}
              >
                <Text color="neutral.600" fontWeight={700}>
                  {item.label}
                </Text>
                <Text color="black" maxW="80%">
                  {item.value}
                </Text>
              </VStack>
            ))}
          </HStack>
        </GridItem>
        <GridItem colSpan={2} width="full">
          <HStack spacing="48px" alignItems="flex-start" width="full">
            <VStack width="70%" spacing="8px" alignItems="flex-start">
              <Text color="neutral.600" fontWeight={700}>
                Description
              </Text>
              <Text
                color="neutral.700"
                bgColor="#F0F0F0"
                py="8px"
                px="11px"
                minH="103px"
                width="full"
                rounded="8px"
              >
                {formDetails.description}
              </Text>
            </VStack>
            <VStack width="30%" height="full" spacing="16px">
              {dateFields.map((item, index) => (
                <VStack
                  alignItems="flex-start"
                  width="full"
                  spacing="8px"
                  key={index}
                >
                  <Text color="neutral.600" fontWeight={700}>
                    {item.label}
                  </Text>
                  <Text color="black">
                    {dateFormatter(
                      item.value ?? '',
                      'Do MMM, YYYY hh:mmA',
                      'DD/MM/YYYY hh:mmA'
                    )}
                  </Text>
                </VStack>
              ))}
            </VStack>
          </HStack>
        </GridItem>
      </Grid>
      {/* Row 1 Ends */}
      {/* Row 2 Starts */}
      <Grid
        templateColumns="repeat(4, 1fr)"
        rowGap="32px"
        columnGap={0}
        width="full"
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" width="full" spacing="8px">
            <Text color="neutral.600" fontWeight={700}>
              Frequency
            </Text>
            <Text color="black" maxW="80%">
              {formDetails?.frequencyName}
            </Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={3}>
          <HStack alignItems="flex-start" spacing="24px">
            <VStack alignItems="flex-start" spacing="8px">
              <Text color="neutral.600" fontWeight={700} whiteSpace="nowrap">
                Service Level Agreement
              </Text>
              <Text color="black" maxW="80%">
                {formDetails?.sla
                  ? `${formDetails?.sla} ${formDetails?.sla > 1 ? 'hours' : 'hour'}`
                  : 'N/A'}
              </Text>
              <InfoCard infoText="Service Level Agreement is the time required to complete the tasks in the schedule" />
            </VStack>
          </HStack>
        </GridItem>
      </Grid>
      {/* Row 2 Ends */}
      {/* Row 3 Starts */}
      {showTasks && (
        <Grid
          templateColumns="repeat(4, 1fr)"
          rowGap="32px"
          columnGap={0}
          width="full"
        >
          <GridItem colSpan={4} width="full">
            <VStack width="full" alignItems="flex-start" spacing="24px">
              <Text color="neutral.600" fontWeight={700}>
                Tasks
              </Text>
              <TaskListTable
                data={formDetails.tasks}
                displayType="summary"
                type="list"
              />
            </VStack>
          </GridItem>
          {/* Row 3 Ends */}
        </Grid>
      )}
    </Flex>
  );
};

export default SectionTwo;
