import { FilterDropDown } from '@repo/ui/components';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { DATE_PERIOD } from '~/lib/utils/constants';

interface RiskThresholdProps {
  selectedOptions: Option[];
  handleSelectedOption: (option: Option) => void;
}

const RiskThreshold = ({
  selectedOptions,
  handleSelectedOption,
}: RiskThresholdProps) => {
  // Convert DATE_PERIOD into Option[] once
  const options = useMemo<Option[]>(
    () =>
      Object.entries(DATE_PERIOD).map(([label, value]) => ({
        label: _.capitalize(`${label}ly`),
        value,
      })),
    []
  );

  return (
    <FilterDropDown
      label="Risk Threshold:"
      options={options}
      selectedOptions={selectedOptions}
      handleClick={(value) => handleSelectedOption(value)}
      hasMoreOptions={false} // since it’s static
      isLoading={false}
      containerStyles={{ border: '1px solid #BBBBBB', borderRadius: '6px' }}
    />
  );
};

export default RiskThreshold;
