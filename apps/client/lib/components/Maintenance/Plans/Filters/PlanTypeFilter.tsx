import React from 'react';
import FilterDropDown from '~/lib/components/UI/FilterDropDown';
import { Option } from '~/lib/interfaces/general.interfaces';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';

interface CategoryFilterProps {
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: Option) => void;
}
const PlanTypeFilter = (props: CategoryFilterProps) => {
  const { selectedOptions, handleSelectedOption } = props;

  const TYPE_OPTIONS = [
    {
      label: 'Default',
      value: MAINTENANCE_PLAN_ENUM.default,
    },
    {
      label: 'Custom',
      value: MAINTENANCE_PLAN_ENUM.custom,
    },
  ];

  return (
    <FilterDropDown
      label="Plan Type:"
      options={TYPE_OPTIONS}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={false}
      loadMoreOptions={undefined}
    />
  );
};

export default PlanTypeFilter;
