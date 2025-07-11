import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { COLOR_CODES_FALLBACK, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateOptions } from '~/lib/utils/helperFunctions';
import TicketInfoDropDown from '../../TicketManagement/Drawers/Common/TicketInfoDropdown';

interface FeedbackDrawerHeaderProps {
  data: Feedback;
}

export interface GenricTicketFormDetails {
  ticketStatusId: number | null;
  ticketPriorityId: number | null;
  ticketTypeId: number | null;
}

const FeedbackDrawerHeader = (props: FeedbackDrawerHeaderProps) => {
  const { data } = props;

  const { values } = useFormikContext<GenricTicketFormDetails>();

  const { data: taskStatuses, isLoading: isFetchingTaskStatuses } =
    useGetAllTaskStatusesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const getItemColorCode = (
    selectedItemId: number | null,
    type: 'status' | 'priority'
  ) => {
    if (!selectedItemId) return COLOR_CODES_FALLBACK.default;

    if (type === 'status') {
      if (!taskStatuses?.data?.items) return COLOR_CODES_FALLBACK.default;

      const selectedItem = taskStatuses.data.items.find(
        (item) => item?.taskStatusId === selectedItemId
      );

      if (!selectedItem) return COLOR_CODES_FALLBACK.default;

      return selectedItem.displayColorCode;
    }
  };

  return (
    <Flex
      bgColor="#B4BFCA4D"
      pt="24px"
      px="24px"
      pb="30px"
      width="full"
      alignItems="flex-start"
      direction="column"
    >
      <Heading
        fontSize={{ base: '24px', lg: '24px' }}
        lineHeight={{
          base: '28.51px',
          lg: '28.51px',
        }}
        color="black"
        fontWeight={{ base: 700, lg: 700 }}
      >
        #{data?.feedbackId} {data?.subject}
      </Heading>

      <HStack
        width="full"
        mt="24px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack
          spacing="20px"
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
          width="full"
        >
          <VStack alignItems="flex-start" spacing="8px" w={{ md: '50%' }}>
            <Text color="neutral.600">Status:</Text>
            <TicketInfoDropDown
              width="120px"
              label="Status"
              name="statusId"
              isLoading={isFetchingTaskStatuses}
              colorCode={getItemColorCode(values.ticketStatusId, 'status')}
              options={generateOptions(
                taskStatuses?.data.items,
                'statusName',
                'taskStatusId'
              )}
            />
          </VStack>

          <VStack alignItems="flex-start" spacing="15px">
            <Text color="neutral.600">Feedback Type</Text>

            <Text color="black">{data.feedbackTypeName}</Text>
          </VStack>

          <VStack alignItems="flex-start" spacing="15px">
            <Text color="neutral.600">Submitted Date</Text>

            <Text color="black">
              {dateFormatter(data.submittedDate, 'DD-MM-YYYY ')}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default FeedbackDrawerHeader;
