import React, { useState, useEffect } from 'react';
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import {
  Button,
  GenericModal,
  SelectableButtonGroup,
} from '@repo/ui/components';
import SectionInfo from '../Form/FormSectionInfo';
import NumberBox from './Common/NumberBox';
import { Option } from '~/lib/interfaces/general.interfaces';
import moment from 'moment';

const PERIODS = [
  {
    label: 'AM',
    value: 'am',
  },
  {
    label: 'PM',
    value: 'pm',
  },
];

interface AddTimeProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectedTime: (time: string) => void;
}

const AddTime = (props: AddTimeProps) => {
  const { isOpen, onClose, handleSelectedTime } = props;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState<Option>(PERIODS[0] as Option);

  // Set initial time based on the current time in 12-hour format
  useEffect(() => {
    const currentTime = moment();
    const currentHour = currentTime.hour();
    const currentPeriod = currentHour >= 12 ? 'pm' : 'am';

    setHours(currentHour % 12 || 12); // Convert to 12-hour format, set 12 for 0
    setMinutes(currentTime.minute());
    setPeriod(PERIODS.find((p) => p.value === currentPeriod) as Option);
  }, []);

  // Handle hour increment and decrement
  const handleHourIncrement = () => {
    if (hours === 12) {
      setHours(1);
      togglePeriod();
    } else {
      setHours(hours + 1);
    }
  };

  const handleHourDecrement = () => {
    if (hours === 1) {
      setHours(12);
      togglePeriod();
    } else {
      setHours(hours - 1);
    }
  };

  // Handle minute increment and decrement
  const handleMinuteIncrement = () => {
    if (minutes === 59) {
      setMinutes(0);
      handleHourIncrement();
    } else {
      setMinutes(minutes + 1);
    }
  };

  const handleMinuteDecrement = () => {
    if (minutes === 0) {
      setMinutes(59);
      handleHourDecrement();
    } else {
      setMinutes(minutes - 1);
    }
  };

  // Toggle between AM and PM
  const togglePeriod = () => {
    setPeriod((prevPeriod) =>
      prevPeriod.value === 'am'
        ? (PERIODS[1] as Option)
        : (PERIODS[0] as Option)
    );
  };

  const handleSubmit = () => {
    const time24Hour = moment(`${hours}:${minutes}${period.value}`, [
      'h:mm A',
    ]).format('HH:mm');
    handleSelectedTime(time24Hour);
    onClose();
  };
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { lg: '526px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <VStack
          width="full"
          spacing="54px"
          alignItems="flex-end"
          pl="32px"
          pr="59px"
          py="32px"
        >
          <HStack width="full" justifyContent="space-between">
            <SectionInfo
              title="Add a Time"
              info="Add name that users can likely search with"
              isRequired={false}
              maxWidth="130px"
            />
            <HStack spacing="8px">
              <NumberBox
                handleIncrement={handleHourIncrement}
                handleDecrement={handleHourDecrement}
                handleValueChange={(value) => setHours(value)}
                minNumber={1}
                maxNumber={12}
                value={hours}
              />
              <NumberBox
                handleIncrement={handleMinuteIncrement}
                handleDecrement={handleMinuteDecrement}
                handleValueChange={(value) => setMinutes(value)}
                minNumber={0}
                maxNumber={59}
                value={minutes}
              />
              <SelectableButtonGroup
                options={PERIODS}
                selectedOptions={[period]}
                handleSelect={(options) => setPeriod(options[0] as Option)}
                buttonVariant="secondary"
                customButtonStyle={{ width: '50px', height: '50px' }}
                isMultiSelect={false}
              />
            </HStack>
          </HStack>
          <HStack spacing="16px">
            <Button
              variant="secondary"
              customStyles={{ width: '116px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              customStyles={{ width: '116px' }}
              handleClick={handleSubmit}
            >
              Add
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default AddTime;
