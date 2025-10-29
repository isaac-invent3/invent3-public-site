// ~/lib/utils/conditionHelpers.ts
import { GenerateReportCriterion } from '~/lib/interfaces/report.interfaces';

export const getJoinSymbol = (join: number) => {
  switch (join) {
    case 1:
      return 'AND';
    case 2:
      return 'OR';
    default:
      return '';
  }
};

export const getOperationSymbol = (operation: number) => {
  switch (operation) {
    case 1:
      return '=';
    case 3:
      return '>';
    case 5:
      return '<';
    default:
      return '=';
  }
};

export const formatConditionsPreview = (
  criteria: GenerateReportCriterion[]
) => {
  if (!criteria?.length) return 'No conditions added yet.';

  return criteria
    .map((c, i) => {
      const op = getOperationSymbol(c?.operation!);
      const join = i < criteria.length - 1 ? ` ${getJoinSymbol(c.join)} ` : '';
      return `${c.columnName} ${op} ${c.columnValue}${join}`;
    })
    .join('');
};
