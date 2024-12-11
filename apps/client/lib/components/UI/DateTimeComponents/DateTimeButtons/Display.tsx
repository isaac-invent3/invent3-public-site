import React from 'react';
import { Button } from '@repo/ui/components';
import DimissibleContainer from '../../DimissibleContainer';
import moment from 'moment';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';
import { Range } from 'react-date-range';

interface DisplayProps {
  selectedDate?: string | undefined;
  selectedTime: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDateTimeSelect?: (dateTime: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  handleRange?: (info: Range) => void;
  prefix?: string;
  onOpenCustomDate: () => void;
  includeTime: boolean;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  isRange: boolean;
  range?: Range;
}

const Display = (props: DisplayProps) => {
  const {
    handleDateTimeSelect,
    handleRange,
    onOpenCustomDate,
    includeTime,
    selectedDate,
    selectedTime,
    prefix,
    setTime,
    isRange,
    range,
  } = props;
  const dispatch = useAppDispatch();

  const getDisplayText = () => {
    if (!selectedDate) return '';

    const now = moment().startOf('day');
    const date = moment(selectedDate, 'DD/MM/YYYY').startOf('day');
    const dayDifference = date.diff(now, 'days');

    const displayTime =
      includeTime && selectedTime
        ? moment(selectedTime, ['HH:mm']).format('hh:mm A')
        : '';

    const displayTemplate = (text: string) => {
      return `${prefix ? `${prefix} ` : ''}${text}${displayTime ? `, ${displayTime}` : ''}`;
    };

    if (dayDifference === 0) {
      return displayTemplate('Today');
    } else if (dayDifference === 1) {
      return displayTemplate('Tomorrow');
    } else if (dayDifference == 7) {
      return displayTemplate(`Next ${date.format('dddd')}`);
    } else {
      return displayTemplate(
        `${moment(selectedDate, 'DD/MM/YYYY').format(
          `${includeTime && displayTime ? 'MMM' : 'MMMM'} D, YYYY`
        )}`
      );
    }
  };

  if (selectedDate || range?.startDate) {
    return (
      <DimissibleContainer
        handleClose={() => {
          setTime(undefined);
          dispatch(updateRecurrence({ startDate: null }));
          if (handleDateTimeSelect) {
            handleDateTimeSelect(null);
          }
          if (handleRange) {
            handleRange({ startDate: undefined, endDate: undefined });
          }
        }}
      >
        <Button
          customStyles={{ height: '37px', py: '10px' }}
          handleClick={onOpenCustomDate}
        >
          {!isRange
            ? getDisplayText()
            : range
              ? `${moment(range.startDate).format('D MMM YYYY')} - ${moment(range.endDate).format('D MMM YYYY')}`
              : ''}
        </Button>
      </DimissibleContainer>
    );
  }

  return null;
};

export default Display;
