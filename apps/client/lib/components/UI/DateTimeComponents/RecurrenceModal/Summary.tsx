import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { summaryText } from '~/lib/components/Common/HelperFunctions/RecurrenceSummary';
import { InfoIcon } from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';

const Summary = () => {
  const recurrence = useAppSelector((state) => state.date.info.recurrence);

  const getOccurrence = () => {
    switch (recurrence?.frequency?.label) {
      case 'Daily':
        return recurrence.repeatIntervals.daily;
      case 'Weekly':
        return recurrence.repeatIntervals.weekly;
      case 'Monthly':
      case 'Quarterly':
        return recurrence.repeatIntervals.monthly;
      case 'Annually':
        return recurrence.repeatIntervals.annually;
      default:
        return null;
    }
  };

  return (
    <Tooltip
      label={summaryText({
        occurrences: getOccurrence(),
        frequency: recurrence?.frequency?.label,
        endDate: recurrence.endDate,
        interval: recurrence.interval,
      })}
      placement="top-start"
    >
      <HStack width="full">
        <Icon as={InfoIcon} boxSize="16px" />
        <Text>View Summary</Text>
      </HStack>
    </Tooltip>
  );
};

export default Summary;
