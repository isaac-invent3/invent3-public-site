import moment from 'moment';

function transformMonthIdsToShortNames(monthIds: number[]) {
  return monthIds.map((monthId) =>
    moment()
      .month(monthId - 1)
      .format('MMM')
      .toLowerCase()
  );
}

export { transformMonthIdsToShortNames };
