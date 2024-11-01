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

const handleCombineDateTime = (date: string, time: string) => {
  const combinedDateTime =
    moment(date)
      .utcOffset(0, true)
      .set({
        hour: parseInt(time.split(':')?.[0] ?? '0'),
        minute: parseInt(time.split(':')?.[1] ?? '0'),
      })
      .toISOString() ?? null;

  return combinedDateTime;
};

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
  } = props;
  const [time, setTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Option | null>(null);
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
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
                    setSelectedDate(item);
                    handleDateTimeSelect && handleDateTimeSelect(item.value);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button customStyles={buttonStyle}>
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
        {showRepeat && selectedDate && (
          <Button customStyles={buttonStyle} handleClick={onOpenFrequency}>
            <Icon as={RepeatIcon} boxSize="16px" color="#374957" mr="8px" />
            Repeat
          </Button>
        )}
      </HStack>
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
      <Frequency
        isOpen={isOpenFrequency}
        onClose={onCloseFrequency}
        selectedDateTime={
          selectedDate
            ? handleCombineDateTime(
                selectedDate?.value as string,
                time ?? '00:00'
              )
            : null
        }
      />
    </>
  );
};

export default DateTimeButtons;
