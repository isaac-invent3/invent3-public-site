import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import { RecurrenceInfo } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const formatAnnualRepeats = (annualIntervals: { [name: number]: number[] }) => {
  return (
    _(annualIntervals)
      // Convert object entries to an array and filter out months with no days
      .toPairs()
      // eslint-disable-next-line no-unused-vars
      .filter(([month, days]) => days.length > 0)
      // Sort the months by month number in ascending order
      .sortBy(([month]) => Number(month))
      .map(([month, days]) => {
        // Sort days in ascending order
        const sortedDays = _.sortBy(days);
        // Convert month number to month name
        const monthName = moment()
          .month(Number(month) - 1)
          .format('MMMM');
        // Format days as a comma-separated string
        const formattedDays = sortedDays.join(', ');
        return `${monthName} ${formattedDays}`;
      })
      .join(', ')
  );
};

// Helper to format recurrence interval and suffix
const formatRecurrenceInterval = (interval: number) => {
  const recurrenceInterval = interval > 1 ? ` ${interval}` : '';
  const intervalSuffix = interval > 1 ? 's' : '';
  return { recurrenceInterval, intervalSuffix };
};

const formatEndDateLabel = (endDate: string | null) =>
  endDate ? `, until ${dateFormatter(endDate, 'MMM D, YYYY')}` : '';

const formatDaily = (recurrence: RecurrenceInfo) => {
  const { recurrenceInterval, intervalSuffix } = formatRecurrenceInterval(
    recurrence.interval
  );
  const times = recurrence.repeatIntervals.daily
    .map((time) => dateFormatter(time, 'hh:mm A', ['HH:mm']))
    .join(', ');
  return `Repeats every${recurrenceInterval} day${intervalSuffix} at ${times}`;
};

const formatWeekly = (recurrence: RecurrenceInfo) => {
  const { recurrenceInterval, intervalSuffix } = formatRecurrenceInterval(
    recurrence.interval
  );
  const daysOfWeek = _.sortBy(recurrence.repeatIntervals.weekly)
    .map((dayNumber) => moment().day(dayNumber).format('dddd'))
    .join(', ');
  return `Repeats every${recurrenceInterval} week${intervalSuffix} on ${daysOfWeek}`;
};

const formatMonthlyOrQuarterly = (recurrence: RecurrenceInfo) => {
  const { recurrenceInterval, intervalSuffix } = formatRecurrenceInterval(
    recurrence.interval
  );
  const daysOfMonth = _.sortBy(recurrence.repeatIntervals.monthly).join(', ');
  return `Repeats every${recurrenceInterval} month${intervalSuffix} on day ${daysOfMonth}`;
};

const formatAnnually = (recurrence: RecurrenceInfo) => {
  const { recurrenceInterval, intervalSuffix } = formatRecurrenceInterval(
    recurrence.interval
  );
  const formattedAnnualRepeats = formatAnnualRepeats(
    recurrence.repeatIntervals.annually
  );
  return `Repeats every${recurrenceInterval} year${intervalSuffix} on ${formattedAnnualRepeats}`;
};

const Summary = () => {
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  const endDateLabel = formatEndDateLabel(recurrence.endDate);

  const summaryText = () => {
    switch (recurrence?.frequency?.label) {
      case 'Daily':
        return `${formatDaily(recurrence)}${endDateLabel}`;
      case 'Weekly':
        return `${formatWeekly(recurrence)}${endDateLabel}`;
      case 'Monthly':
      case 'Quarterly':
        return `${formatMonthlyOrQuarterly(recurrence)}${endDateLabel}`;
      case 'Annually':
        return `${formatAnnually(recurrence)}${endDateLabel}`;
      default:
        return '';
    }
  };

  return (
    <Tooltip label={summaryText()} placement="top-start">
      <HStack width="full">
        <Icon as={InfoIcon} boxSize="16px" />
        <Text>View Summary</Text>
      </HStack>
    </Tooltip>
  );
};

export default Summary;
