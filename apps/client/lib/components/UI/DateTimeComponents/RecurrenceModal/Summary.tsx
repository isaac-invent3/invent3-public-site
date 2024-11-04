import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

function formatAnnualRepeats(annualIntervals: { [name: number]: number[] }) {
  return (
    Object.entries(annualIntervals)
      // eslint-disable-next-line no-unused-vars
      .filter(([month, days]) => days.length > 0) // Only include months with days
      .map(([month, days]) => {
        const monthName = moment()
          .month(Number(month) - 1)
          .format('MMMM'); // Convert month number to month name
        const formattedDays = days.join(', ');
        return `${monthName} ${formattedDays}`;
      })
      .join(', ')
  );
}

const Summary = () => {
  const frequencyInfo = useAppSelector((state) => state.date.info.frequency);

  const endDateLabel = frequencyInfo.endDate
    ? `Until ${dateFormatter(frequencyInfo.endDate, 'MMM D, YYYY')}`
    : '';

  const summaryText = () => {
    switch (frequencyInfo?.repeat?.label) {
      case 'Daily':
        return `Repeats at ${frequencyInfo.repeatIntervals.daily.map((time) => dateFormatter(time, 'hh:mm A', ['HH:mm'])).join(', ')}. ${frequencyInfo.interval} day interval. ${endDateLabel}`;
      case 'Weekly':
        return `Repeats on ${frequencyInfo.repeatIntervals.weekly
          .map((dayNumber) => moment().day(dayNumber).format('dddd'))
          .join(
            ', '
          )}, ${frequencyInfo.interval} week interval. ${endDateLabel}`;
      case 'Monthly':
        return `Repeats on ${frequencyInfo.repeatIntervals.monthly.map((day) => `Day ${day}`).join(', ')}. ${frequencyInfo.interval} month interval. ${endDateLabel}`;
      case 'Quarterly':
        return `Repeats on ${frequencyInfo.repeatIntervals.monthly.map((day) => `Day ${day}`).join(', ')}, every ${frequencyInfo.interval} months. ${endDateLabel}`;
      case 'Annually':
        return `Repeats on ${formatAnnualRepeats(frequencyInfo.repeatIntervals.annually)}. ${frequencyInfo.interval} year interval. ${endDateLabel}`;
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
