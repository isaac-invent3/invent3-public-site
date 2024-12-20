import { keyframes } from '@emotion/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { GenerateReportCriterion } from '~/lib/interfaces/report.interfaces';
import { SystemContextTypeColumnDataType } from '~/lib/interfaces/systemContextType.interfaces';

const newCriterion: GenerateReportCriterion = {
  columnName: '',
  columnValue: '',
  operation: 1,
  join: 1,
};

const getRelationalOperators = (
  dataType: SystemContextTypeColumnDataType | undefined
) => {
  const baseOperators: Option[] = [
    {
      label: '= Equals',
      value: 'Equals',
    },
  ];

  const additionalOperators: Option[] = [];

  if (dataType) {
    const numericTypes = ['int', 'datetime2', 'decimal'];

    if (numericTypes.includes(dataType)) {
      additionalOperators.push(
        {
          label: '< Less Than',
          value: 'Less Than',
        },
        {
          label: '> Greater Than',
          value: 'Greater Than',
        }
      );
    }
  }

  return [...baseOperators, ...additionalOperators];
};

const getSelectedOperatorOption = (
  dataType: SystemContextTypeColumnDataType | undefined,
  selectedOperator: number | null | undefined
): Option | undefined => {
  return getRelationalOperators(dataType).find(
    (item) => item.value === selectedOperator
  );
};

const entryAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const exitAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;



export {
  getRelationalOperators,
  getSelectedOperatorOption,
  newCriterion,
  entryAnimation,
  exitAnimation,
};
