import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import AddTime from '../AddTime';
import { FrequencyInfo } from '~/lib/interfaces/general.interfaces';
import CustomDate from '../CustomDate';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateFrequency } from '~/lib/redux/slices/DateSlice';
import Button from '../../Button';
import { PenIcon } from '~/lib/components/CustomIcons';
import { RepeatIcon } from '@chakra-ui/icons';
import SlideTransition from '../../SlideTransition';
import Display from './Display';
import RecurrenceModal from '../RecurrenceModal';

interface DateTimeButtonsProps {
  showRepeat: boolean;
  includeTime: boolean;
  buttonVariant: 'solid' | 'outline';
  prefix?: string;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: string | undefined;
  selectedTime?: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDateTimeSelect?: (dateTime: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  handleFrequencyInfo?: (info: FrequencyInfo) => void;
}
const DateTimeButtons = (props: DateTimeButtonsProps) => {
  const {
    prefix,
    showRepeat,
    buttonVariant,
    includeTime,
    minDate,
    maxDate,
    selectedDate,
    selectedTime,
    handleDateTimeSelect,
  } = props;
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<string | undefined>(
    selectedTime ?? undefined
  );
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  const {
    isOpen: isOpenCustomDate,
    onOpen: onOpenCustomDate,
    onClose: onCloseCustomDate,
  } = useDisclosure();
  const {
    isOpen: isOpenRecurrence,
    onOpen: onOpenRecurrence,
    onClose: onCloseRecurrence,
  } = useDisclosure();

  const today = moment().utcOffset(0, true);
  const tomorrow = moment().utcOffset(0, true).add(1, 'days');
  const nextWeek = moment().utcOffset(0, true).add(1, 'week');

  const now = moment().startOf('day');
  const date = moment(selectedDate).startOf('day');
  const dayDifference = date.diff(now, 'days');

  const buttonStyle = {
    py: '10px',
    px: '16px',
    height: '37px',
    color: 'black',
    width: 'max-content',
    border: buttonVariant === 'outline' ? '1px solid #898989' : 'none',
    bgColor: buttonVariant === 'solid' ? '#E4E4E4' : 'transparent',
    _hover: { bgColor: 'none' },
    _active: { bgColor: 'none' },
    _focus: { bgColor: 'none' },
  };

  const mainButtons = [
    {
      label: 'Today',
      value: today.toISOString(),
    },
    {
      label: 'Tomorrow',
      value: tomorrow.toISOString(),
    },
    {
      label: `Next ${nextWeek.format('dddd')}`,
      value: nextWeek.toISOString(),
    },
  ];

  return (
    <>
      <HStack flexWrap="wrap" spacing="16px">
        {/* Display Starts Here */}
        <Display
          selectedDate={selectedDate}
          handleDateTimeSelect={handleDateTimeSelect}
          prefix={prefix}
          onOpenCustomDate={onOpenCustomDate}
          includeTime={includeTime}
          selectedTime={time}
          setTime={setTime}
        />
        {/* Display Ends Here */}
        {!selectedDate && (
          <SlideTransition trigger={selectedDate ? false : true}>
            <HStack
              flexWrap="wrap"
              spacing="16px"
              display={selectedDate ? 'none' : 'flex'}
            >
              {mainButtons.map((item, index: number) => (
                <Button
                  customStyles={buttonStyle}
                  key={index}
                  handleClick={() => {
                    dispatch(updateFrequency({ startDate: item.value }));
                    if (handleDateTimeSelect) {
                      handleDateTimeSelect(
                        moment(item.value).format('DD/MM/YYYY')
                      );
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button customStyles={buttonStyle} handleClick={onOpenCustomDate}>
                <Icon as={PenIcon} boxSize="16px" color="#374957" mr="8px" />
                Custom
              </Button>
              {showRepeat && (
                <Button
                  customStyles={buttonStyle}
                  handleClick={onOpenRecurrence}
                >
                  <Icon
                    as={RepeatIcon}
                    boxSize="16px"
                    color="#374957"
                    mr="8px"
                  />
                  Repeat
                </Button>
              )}
            </HStack>
          </SlideTransition>
        )}
        {includeTime && selectedDate && !time && dayDifference <= 7 && (
          <Button customStyles={buttonStyle} handleClick={onOpenTime}>
            <Icon
              as={PenIcon}
              boxSize="16px"
              color="#374957"
              mr="8px"
              cursor="pointer"
            />
            Add Time
          </Button>
        )}
        {showRepeat && selectedDate && (
          <Button customStyles={buttonStyle} handleClick={onOpenRecurrence}>
            <Icon as={RepeatIcon} boxSize="16px" color="#374957" mr="8px" />
            Repeat
          </Button>
        )}
      </HStack>
      {isOpenTime && (
        <AddTime
          isOpen={isOpenTime}
          onClose={onCloseTime}
          handleSelectedTime={(time) => {
            setTime(time);
            handleDateTimeSelect &&
              handleDateTimeSelect(`${selectedDate ?? ''} ${time}`);
          }}
        />
      )}
      {isOpenRecurrence && (
        <RecurrenceModal
          isOpen={isOpenRecurrence}
          onClose={onCloseRecurrence}
          minStartDate={minDate}
          selectedDateTime={
            selectedDate
              ? moment(selectedDate, 'DD/MM/YYYY').toISOString()
              : null
          }
        />
      )}

      {isOpenCustomDate && (
        <CustomDate
          shouldIncludeTime={includeTime}
          isOpen={isOpenCustomDate}
          onClose={onCloseCustomDate}
          initialDate={
            selectedDate
              ? moment(selectedDate, 'DD/MM/YYYY').toDate()
              : undefined
          }
          initialTime={time}
          minDate={minDate}
          maxDate={maxDate}
          handleSetDateTime={(date, time) => {
            setTime(time);
            if (handleDateTimeSelect) {
              const selectedDateTime = `${date ? moment(date).format('DD/MM/YYYY') : ''}${time ? ` ${time}` : ''}`;
              handleDateTimeSelect(selectedDateTime);
              if (date) {
                dispatch(
                  updateFrequency({ startDate: moment(date).toISOString() })
                );
              }
            }
          }}
        />
      )}
    </>
  );
};

export default DateTimeButtons;
