import moment from 'moment';

function generateTimeIntervalsForDay(
  startTimeISO: string,
  intervalValue: number
) {
  const intervals = [];
  let currentTime = moment(startTimeISO);

  // Convert interval to minutes
  const intervalInMinutes = intervalValue * 60;

  // Define the end time as 24 hours from the start time
  const endTime = moment(startTimeISO).add(1, 'day');

  // Continue adding intervals until reaching the end time
  while (currentTime.isBefore(endTime)) {
    intervals.push(currentTime.format('HH:mm'));
    currentTime = currentTime.add(intervalInMinutes, 'minutes');
  }

  return intervals;
}

export { generateTimeIntervalsForDay };
