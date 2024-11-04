import React from 'react';
import Button from '../../Button';
import DimissibleContainer from '../../DimissibleContainer';
import moment from 'moment';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateFrequency } from '~/lib/redux/slices/DateSlice';

interface DisplayProps {
  selectedDate?: string | undefined;
  selectedTime: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleDateTimeSelect?: (dateTime: string | null) => void;
  prefix?: string;
  onOpenCustomDate: () => void;
  includeTime: boolean;
  setTime: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Display = (props: DisplayProps) => {
  const {
    handleDateTimeSelect,
    onOpenCustomDate,
    includeTime,
    selectedDate,
    selectedTime,
    prefix,
    setTime,
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

  if (selectedDate) {
    return (
      <DimissibleContainer
        handleClose={() => {
          setTime(undefined);
          dispatch(updateFrequency({ startDate: null }));
          if (handleDateTimeSelect) {
            handleDateTimeSelect(null);
          }
        }}
      >
        <Button
          customStyles={{ height: '37px', py: '10px' }}
          handleClick={onOpenCustomDate}
        >
          {getDisplayText()}
        </Button>
      </DimissibleContainer>
    );
  }

  return null;
};

export default Display;
