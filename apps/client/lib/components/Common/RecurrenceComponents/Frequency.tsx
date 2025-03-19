import { FormInputWrapper, FormSelect } from '@repo/ui/components';
import React, { useEffect } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { MaintenanceFrequency } from '~/lib/interfaces/maintenance.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useGetAllMaintenanceFrequenciesQuery } from '~/lib/redux/services/maintenance/frequency.services';
import {
  clearRepeatInterval,
  updateRecurrence,
} from '~/lib/redux/slices/DateSlice';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface FrequencyProps {
  setMaxInterval: React.Dispatch<React.SetStateAction<number>>;
}
const Frequency = (props: FrequencyProps) => {
  const { setMaxInterval } = props;

  const dispatch = useAppDispatch();
  const dateInfo = useAppSelector((state) => state.date.info);
  const { data, isLoading } = useGetAllMaintenanceFrequenciesQuery({});

  // Sets the first Frequency as default
  useEffect(() => {
    if (data?.data?.items && !dateInfo.recurrence.frequency?.value) {
      const options = generateOptions(
        data?.data?.items,
        'frequencyName',
        'frequencyId'
      );
      if (options.length > 0) {
        dispatch(updateRecurrence({ frequency: options[0] as Option }));
      }
    }
  }, [data]);

  useEffect(() => {
    if (dateInfo.recurrence.frequency && data?.data?.items) {
      const repeat = dateInfo.recurrence.frequency;
      const frequencyList: MaintenanceFrequency[] = data.data.items;
      const selectedFrequency = frequencyList.find(
        (item) => item.frequencyId === repeat.value
      );

      if (
        selectedFrequency &&
        selectedFrequency.intervalValues &&
        selectedFrequency.intervalValues.length > 1
      ) {
        const lastIntervalValue =
          selectedFrequency.intervalValues[
            selectedFrequency.intervalValues.length - 1
          ];

        // If last Interval value exists
        setMaxInterval(lastIntervalValue ?? 1); // Set fallback value to 1
      }
    }
  }, [dateInfo.recurrence.frequency, data?.data?.items]);

  return (
    <FormInputWrapper
      title="Repeats"
      description="Choose how often the occurence will repeat"
      isRequired={false}
      sectionMaxWidth="130px"
      customSpacing="29px"
      mb="32px"
    >
      <FormSelect
        name="repeat"
        title="Repeat"
        options={generateOptions(
          data?.data?.items,
          'frequencyName',
          'frequencyId'
        )}
        isLoading={isLoading}
        isSearchable
        selectedOption={dateInfo.recurrence.frequency ?? undefined}
        showTitleAfterSelect={false}
        onSelect={(option) => {
          dispatch(clearRepeatInterval());
          dispatch(
            updateRecurrence({ frequency: option as Option, interval: 1 })
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default Frequency;
