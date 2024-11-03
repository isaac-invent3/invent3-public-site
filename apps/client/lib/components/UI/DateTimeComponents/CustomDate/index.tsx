import React, { useState } from 'react';
import GenericModal from '../../Modal';
import {
  HStack,
  Icon,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Button from '../../Button';
import DatePicker, { registerLocale } from 'react-datepicker';
import { dateFormatter } from '~/lib/utils/Formatters';
import AddTime from '../AddTime';
import { ClockIcon, RemoveIcon } from '~/lib/components/CustomIcons';
import { enGB } from 'date-fns/locale/en-GB';
import './style.css';
import moment from 'moment';
import { handleCombineDateTime } from '../Common/helperFunction';

registerLocale('en-GB', enGB);

interface CustomDateProps {
  isOpen: boolean;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
  // eslint-disable-next-line no-unused-vars
  handleSetDateTime: (info: string) => void;
}
const CustomDate = (props: CustomDateProps) => {
  const { isOpen, onClose, minDate, maxDate, handleSetDateTime } = props;
  const [time, setTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().toISOString()
  );
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();
  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { lg: '526px' } }}
      >
        <ModalBody m={0} p={0} py="32px" pl="32px" pr="27px" width="full">
          <VStack width="full" alignItems="flex-start" spacing="51px">
            <Text size="lg" color="primary.500" fontWeight={700}>
              Custom Date
            </Text>
            <HStack
              width="full"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <DatePicker
                onChange={(date) => {
                  const inputtedDate = moment(date).toISOString();
                  setSelectedDate(inputtedDate);
                }}
                dateFormat="mm/dd/yyyy"
                showMonthDropdown
                showYearDropdown
                minDate={minDate}
                maxDate={maxDate}
                inline
                locale="en-GB"
                weekDayClassName={(date) =>
                  moment(date).format('dd') == 'Sa' ||
                  moment(date).format('dd') == 'Su'
                    ? 'custom-weekend'
                    : ''
                }
                dayClassName={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                    ? 'custom-weekend'
                    : 'weekdays'
                }
              />
              <VStack alignItems="flex-end" width="max-content" spacing="8px">
                <Text color="primary.500">West Africa Standard Time</Text>
                <HStack spacing="8px" as="button" onClick={onOpenTime}>
                  <Text color="#0366EF">
                    {time
                      ? `${dateFormatter(time, 'hh:mm A', ['HH:mm'])}`
                      : 'Add a time'}
                  </Text>
                  <Icon as={ClockIcon} boxSize="16px" color="#0366EF" />
                </HStack>
                {time && (
                  <HStack
                    spacing="8px"
                    as="button"
                    onClick={() => setTime(null)}
                  >
                    <Text color="#F50000" fontSize="10px" lineHeight="11.88px">
                      Remove Time
                    </Text>
                    <Icon as={RemoveIcon} boxSize="12px" color="#F50000" />
                  </HStack>
                )}
              </VStack>
            </HStack>
            <HStack spacing="16px" width="full" justifyContent="flex-end">
              <Button
                variant="secondary"
                customStyles={{ width: '116px' }}
                handleClick={onClose}
              >
                Cancel
              </Button>
              <Button
                customStyles={{ width: '116px' }}
                handleClick={() => {
                  handleSetDateTime(
                    handleCombineDateTime(selectedDate, time ?? '0')
                  );
                  onClose();
                }}
              >
                Done
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </GenericModal>
      {isOpenTime && (
        <AddTime
          isOpen={isOpenTime}
          onClose={onCloseTime}
          handleSelectedTime={(time) => setTime(time)}
        />
      )}
    </>
  );
};

export default CustomDate;
