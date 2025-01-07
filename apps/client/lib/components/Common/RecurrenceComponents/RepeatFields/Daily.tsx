import React, { useEffect, useState } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  AddTime,
  Button,
  CustomDateButton,
  DimissibleContainer,
  FormSectionInfo,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateRepeatInterval } from '~/lib/redux/slices/DateSlice';
import { generateTimeIntervalsForDay } from '../helperFunction';

const StaticIntervals: Option[] = [
  {
    label: '30 Minutes',
    value: 0.5,
  },
  {
    label: '1 Hour',
    value: 1,
  },
  {
    label: '2 Hours',
    value: 2,
  },
];

interface DailyProps {
  selectedDateTime: string | null;
}
const Daily = (props: DailyProps) => {
  // eslint-disable-next-line no-unused-vars
  const { selectedDateTime } = props;
  const dailyInterval = useAppSelector(
    (state) => state.date.info.recurrence.repeatIntervals.daily
  );
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const [type, setType] = useState<'static' | 'custom' | null>(null);
  const [selectedStaticInterval, setSelectedStaticInterval] = useState<
    Option[]
  >([StaticIntervals[1] as Option]);

  const handleStaticInterval = (interval: Option) => {
    if (type !== 'static') {
      setType('static');
    }
    setSelectedStaticInterval([interval]);
    dispatch(
      updateRepeatInterval({
        daily: selectedDateTime
          ? generateTimeIntervalsForDay(
              selectedDateTime,
              interval.value as number
            )
          : [],
      })
    );
  };

  const handleDismissCustomTime = (time: string) => {
    const newRepeatInterval = dailyInterval.filter((item) => item !== time);
    dispatch(updateRepeatInterval({ daily: newRepeatInterval }));
    if (dailyInterval.length === 1) {
      setType(null);
    }
  };

  const handleAddCustomTime = (time: string) => {
    if (type !== 'custom') {
      setType('custom');
    }
    const timeIsInclude = dailyInterval.some((option) => option === time);
    if (!timeIsInclude) {
      dispatch(updateRepeatInterval({ daily: [...dailyInterval, time] }));
    }
  };

  // Regenerate Static Intervals if Selected Date & time changes.
  useEffect(() => {
    if (selectedDateTime) {
      if (selectedStaticInterval.length >= 1) {
        dispatch(
          updateRepeatInterval({
            daily: generateTimeIntervalsForDay(
              selectedDateTime,
              selectedStaticInterval[0]?.value as number
            ),
          })
        );
      } else {
        dispatch(updateRepeatInterval({ daily: [] }));
      }
    }
  }, [selectedDateTime]);

  return (
    <>
      <HStack width="full" spacing="29px" alignItems="flex-start" mb="32px">
        <FormSectionInfo
          title="Every"
          info="Select specific intervals for the occurence schedule"
          isRequired={false}
          maxWidth="130px"
        />
        {type === 'custom' ? (
          <HStack width="full" spacing="8px" flexWrap="wrap">
            {dailyInterval.map((time, index) => (
              <DimissibleContainer
                key={index}
                handleClose={() => handleDismissCustomTime(time as string)}
              >
                <Button customStyles={{ height: '37px', py: '10px' }}>
                  {dateFormatter(time as string, 'hh:mm A', ['HH:mm'])}
                </Button>
              </DimissibleContainer>
            ))}
            <CustomDateButton
              handleClick={onOpenTime}
              buttonVariant="outline"
              buttonText="Add Time"
            />
          </HStack>
        ) : (
          <HStack flexWrap="wrap" spacing="8px">
            <SelectableButtonGroup
              options={StaticIntervals}
              selectedOptions={selectedStaticInterval}
              handleSelect={(options) =>
                handleStaticInterval(options[0] as Option)
              }
              buttonVariant="outline"
              customButtonStyle={{ width: 'max-content' }}
              customContainerStyle={{ spacing: '8px' }}
              isMultiSelect={false}
              hasAtLeastOneSelected
            />
            <CustomDateButton
              handleClick={() => {
                dispatch(updateRepeatInterval({ daily: [] }));
                onOpenTime();
              }}
              buttonVariant="outline"
            />
          </HStack>
        )}
      </HStack>
      <AddTime
        isOpen={isOpenTime}
        onClose={onCloseTime}
        handleSelectedTime={(time) => {
          handleAddCustomTime(time);
        }}
      />
    </>
  );
};

export default Daily;
