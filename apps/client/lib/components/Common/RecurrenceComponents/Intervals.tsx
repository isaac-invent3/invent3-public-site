import { HStack, Text } from '@chakra-ui/react';

import { FormInputWrapper, NumberBox } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import RepeatFields from './RepeatFields';

interface IntervalsProps {
  maxInterval: number;
}
const Intervals = (props: IntervalsProps) => {
  const { maxInterval } = props;
  const dispatch = useAppDispatch();
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  const interval = recurrence.interval;

  return (
    <>
      <FormInputWrapper
        title="Interval"
        description="Set the interval between occurrences"
        isRequired={false}
        sectionMaxWidth="130px"
        customSpacing="29px"
        mb="32px"
      >
        <HStack spacing="24px">
          <NumberBox
            minNumber={1}
            maxNumber={maxInterval}
            value={interval}
            handleValueChange={(value) =>
              dispatch(updateRecurrence({ interval: value }))
            }
            handleDecrement={() =>
              interval > 1 &&
              dispatch(updateRecurrence({ interval: interval - 1 }))
            }
            handleIncrement={() =>
              interval < maxInterval &&
              dispatch(updateRecurrence({ interval: interval + 1 }))
            }
            customStyle={{ bgColor: 'transparent' }}
          />
          <Text textTransform="capitalize">{recurrence.frequency?.label}</Text>
        </HStack>
      </FormInputWrapper>
      <RepeatFields selectedDateTime={recurrence.startDate ?? null} />
    </>
  );
};

export default Intervals;
