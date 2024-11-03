/* eslint-disable no-unused-vars */
import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../Button';
import { PenIcon, RepeatIcon } from '../../CustomIcons';
import SlideTransition from '../SlideTransition';
import AddTime from './AddTime';
import Frequency from './Frequency';
import { FrequencyInfo, Option } from '~/lib/interfaces/general.interfaces';
import DimissibleContainer from '../DimissibleContainer';
import CustomDate from './CustomDate';
import { handleCombineDateTime } from './Common/helperFunction';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';
import { updateFrequency } from '~/lib/redux/slices/DateSlice';

interface DateTimeButtonsProps {
  showRepeat: boolean;
  includeTime: boolean;
  buttonVariant: 'solid' | 'outline';
  prefix?: string;
  minDate?: Date;
  maxDate?: Date;
  handleDateTimeSelect?: (dateTime: string | null) => void;
  handleFrequencyInfo?: (info: FrequencyInfo) => void;
}
const DateTimeButtons = (props: DateTimeButtonsProps) => {
  const {
    prefix,
    showRepeat,
    buttonVariant,
    includeTime,
    handleDateTimeSelect,
    minDate,
    maxDate,
  } = props;
  const dateInfo = useAppSelector((state) => state.date.info);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);
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
    isOpen: isOpenFrequency,
    onOpen: onOpenFrequency,
    onClose: onCloseFrequency,
  } = useDisclosure();

  const time12Hour = moment(time, ['HH:mm']).format('hh:mm A');

  const today = moment().utcOffset(0, true);
  const tomorrow = moment().utcOffset(0, true).add(1, 'days');
  const nextWeek = moment().utcOffset(0, true).add(1, 'week');

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
        {selectedDate && (
          <DimissibleContainer
            handleClose={() => {
              setSelectedDate(null);
              handleDateTimeSelect && handleDateTimeSelect(null);
              setTime(null);
            }}
          >
            <Button customStyles={{ height: '37px', py: '10px' }}>
              {prefix ?? ''} {selectedDate?.label}
              {time ? `, ${time12Hour}` : ''}
            </Button>
          </DimissibleContainer>
        )}
        {dateInfo.frequency.startDate && (
          <DimissibleContainer
            handleClose={() => {
              dispatch(updateFrequency({ startDate: null }));
              handleDateTimeSelect && handleDateTimeSelect(null);
            }}
          >
            <Button
              customStyles={{ height: '37px', py: '10px' }}
              handleClick={onOpenCustomDate}
            >
              {moment(dateInfo.frequency.startDate).format(
                'MMM D, YYYY, hh:mm A'
              )}
            </Button>
          </DimissibleContainer>
        )}
        {!selectedDate && !dateInfo.frequency.startDate && (
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
                    setSelectedDate(item);
                    handleDateTimeSelect && handleDateTimeSelect(item.value);
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
                  handleClick={onOpenFrequency}
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
        {includeTime && selectedDate && !time && (
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
        {showRepeat && (selectedDate || dateInfo.frequency.startDate) && (
          <Button customStyles={buttonStyle} handleClick={onOpenFrequency}>
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
              handleDateTimeSelect(
                handleCombineDateTime(selectedDate?.value as string, time)
              );
          }}
        />
      )}
      {isOpenFrequency && (
        <Frequency
          isOpen={isOpenFrequency}
          onClose={onCloseFrequency}
          minStartDate={minDate}
          selectedDateTime={
            selectedDate
              ? handleCombineDateTime(
                  selectedDate?.value as string,
                  time ?? '00:00'
                )
              : null
          }
        />
      )}

      {isOpenCustomDate && (
        <CustomDate
          isOpen={isOpenCustomDate}
          onClose={onCloseCustomDate}
          handleSetDateTime={(dateTime) =>
            dispatch(updateFrequency({ startDate: dateTime }))
          }
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </>
  );
};

export default DateTimeButtons;
