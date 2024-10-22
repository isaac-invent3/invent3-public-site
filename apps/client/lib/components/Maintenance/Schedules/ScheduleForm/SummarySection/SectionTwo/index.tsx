import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';
import TaskListTable from '../../FormSection/SectionTwo/Tasks/ListModal/TaskListTable';
import TaskTable from '~/lib/components/TaskManagement/TaskTable';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';

const SectionTwo = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery(
    {
      id: formDetails?.scheduleId,
      pageSize,
      pageNumber: currentPage,
    },
    { skip: !formDetails?.scheduleId }
  );
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
    <Grid
      templateColumns="repeat(4, 1fr)"
      rowGap="32px"
      columnGap={0}
      width="full"
    >
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
        <HStack spacing="16px" alignItems="flex-start" width="full">
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
      <GridItem colSpan={4} width="full">
        <VStack width="full" alignItems="flex-start" spacing="24px">
          <Text color="neutral.600" fontWeight={700}>
            Tasks
          </Text>

          {formDetails?.scheduleId ? (
            <TaskTable
              data={data?.data?.items ?? []}
              isLoading={isLoading}
              isFetching={isFetching}
              totalPages={data?.data?.totalPages}
              setPageNumber={setCurrentPage}
              pageNumber={currentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              isSortable={false}
              type="modal"
            />
          ) : (
            <TaskListTable data={formDetails.tasks} type="summary" />
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SectionTwo;
