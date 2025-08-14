import { FormInputWrapper, SelectableButtonGroup } from '@repo/ui/components';
import moment from 'moment';
import { useEffect } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Weekly = () => {
  const dispatch = useAppDispatch();
  const weeklyInterval = useAppSelector(
    (state) => state.date.info.recurrence.repeatIntervals.weekly
  );

  //Sets today as the default day
  useEffect(() => {
    if (weeklyInterval.length === 0) {
      const today = moment().day();
      dispatch(updateRepeatInterval({ weekly: [today] }));
    }
  }, []);

  return (
    <FormInputWrapper
      title="On days"
      description="Select specific days for the occurence schedule"
      isRequired={false}
      sectionMaxWidth="130px"
      customSpacing="29px"
      mb="32px"
    >
      <SelectableButtonGroup
        options={DAYS.map(
          (item, index) => ({ label: item, value: index }) as Option
        )}
        selectedOptions={weeklyInterval.map(
          (item) => ({ label: item, value: item }) as unknown as Option
        )}
        handleSelect={(options) =>
          dispatch(
            updateRepeatInterval({
              weekly: options.map((item) => item.value as number),
            })
          )
        }
        buttonVariant="outline"
        customContainerStyle={{ spacing: '4px', flexWrap: 'wrap' }}
        customButtonStyle={{ width: '42px', height: '42px' }}
        isMultiSelect
        hasAtLeastOneSelected
      />
    </FormInputWrapper>
  );
};

export default Weekly;
