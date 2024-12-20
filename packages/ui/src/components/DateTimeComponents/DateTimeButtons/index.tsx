import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import AddTime from '../AddTime';
import CustomDate from '../CustomDate';
import SlideTransition from '../../SlideTransition';
import Display from './Display';
import { Range as DateRange } from 'react-date-range';
import { PenIcon } from '../../CustomIcons';
import Button from '../../Button';
import DateRangeModal from '../DateRange/DateRangeModal';

interface DateTimeButtonsProps {
  includeTime: boolean;
  buttonVariant: 'secondary' | 'outline';
  prefix?: string;
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: string | undefined;
  selectedTime?: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDateTimeSelect?: (dateTime: string | null) => void;
  isRange?: boolean;
  range?: DateRange;
  // eslint-disable-next-line no-unused-vars
  handleRange?: (info: DateRange) => void;
  children?: React.ReactNode;
  showPredefinedDates?: boolean;
  customButtonLabel?: string;
  customDateHeader?: string;
}
const DateTimeButtons = (props: DateTimeButtonsProps) => {
  const {
    prefix,
    buttonVariant,
    includeTime,
    minDate,
    maxDate,
    selectedDate,
    selectedTime,
    handleDateTimeSelect,
    handleRange,
    children,
    isRange = false,
    range,
    showPredefinedDates = true,
    customButtonLabel,
    customDateHeader,
  } = props;
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
    isOpen: isOpenDateRange,
    onOpen: onOpenDateRange,
    onClose: onCloseDateRange,
  } = useDisclosure();

  const today = moment().utcOffset(0, true);
  const tomorrow = moment().utcOffset(0, true).add(1, 'days');
  const nextWeek = moment().utcOffset(0, true).add(1, 'week');

  const now = moment().startOf('day');
  const date = moment(selectedDate, 'DD/MM/YYYY').startOf('day');
  const dayDifference = date.diff(now, 'days');

  const showStaticDates =
    (maxDate && moment(maxDate).isAfter(moment())) || maxDate === undefined;

  const buttonStyle = {
    py: '10px',
    px: '16px',
    height: '37px',
    color: 'black',
    width: 'max-content',
    border: buttonVariant === 'outline' ? '1px solid #898989' : 'none',
    bgColor: buttonVariant === 'secondary' ? '#E4E4E4' : 'transparent',
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
          handleRange={handleRange}
          prefix={prefix}
          onOpenCustomDate={isRange ? onOpenDateRange : onOpenCustomDate}
          includeTime={includeTime}
          selectedTime={time}
          setTime={setTime}
          isRange={isRange}
          range={range}
        />
        {/* Display Ends Here */}
        {!selectedDate && !range?.startDate && (
          <SlideTransition trigger={selectedDate ? false : true}>
            <HStack
              flexWrap="wrap"
              spacing="16px"
              display={selectedDate ? 'none' : 'flex'}
            >
              {showPredefinedDates &&
                showStaticDates &&
                mainButtons.map((item, index: number) => (
                  <Button
                    customStyles={buttonStyle}
                    key={index}
                    handleClick={() => {
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
              <Button
                customStyles={buttonStyle}
                handleClick={isRange ? onOpenDateRange : onOpenCustomDate}
              >
                <Icon as={PenIcon} boxSize="16px" color="#374957" mr="8px" />
                {customButtonLabel ?? 'Custom'}
              </Button>
              {children}
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
        {selectedDate && children}
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

      {isOpenCustomDate && (
        <CustomDate
          headerLabel={customDateHeader}
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
            }
          }}
        />
      )}
      {isOpenDateRange && (
        <DateRangeModal
          isOpen={isOpenDateRange}
          onClose={onCloseDateRange}
          minStartDate={minDate}
          maxEndDate={maxDate}
          dateRange={range}
          handleChangeDate={(info) => handleRange && handleRange(info)}
          headerLabel={customDateHeader}
        />
      )}
    </>
  );
};

export default DateTimeButtons;
