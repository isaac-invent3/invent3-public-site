import moment from 'moment';
import { WeekType } from '~/lib/interfaces/dashboard.interfaces';

export function generateWeekDays(week: WeekType) {
  // Determine the start of the week
  let startOfWeek;
  if (week === 'this') {
    startOfWeek = moment().startOf('week');
  } else if (week === 'last') {
    startOfWeek = moment().subtract(1, 'week').startOf('week');
  } else if (week === 'next') {
    startOfWeek = moment().add(1, 'week').startOf('week');
  } else {
    startOfWeek = moment().startOf('week');
  }

  // Generate the array of days
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = startOfWeek.clone().add(i, 'days');
    return {
      day: day.format('ddd'), // Short day name (e.g., Mon, Tue)
      date: day.format('MM/DD'), // Month/Day format (e.g., 01/25)
      fullDay: day.utcOffset(0, true).toISOString(),
    };
  });

  return days;
}
