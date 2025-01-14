/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  HStack,
  Icon,
  ModalBody,
  Text as ChakraText,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import AddTime from '../AddTime';
import enGB from 'date-fns/locale/en-GB';
import './style.css';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { ClockIcon, RemoveIcon } from '../../CustomIcons';
import dateFormatter from '../../../utils/HelperFunctions/dateFormatter';
import Button from '../../../components/Button';
import GenericModal from '../../../components/Modal';

registerLocale('en-GB', enGB);

interface CustomDateProps {
  isOpen: boolean;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  initialTime?: string;
  headerLabel?: string;
  shouldIncludeTime?: boolean;
  handleSetDateTime?: (
    date: Date | undefined,
    time: string | undefined
  ) => void;
  // eslint-disable-next-line no-unused-vars
}
const CustomDate = (props: CustomDateProps) => {
  const {
    isOpen,
    onClose,
    minDate,
    maxDate,
    initialDate,
    initialTime,
    handleSetDateTime,
    shouldIncludeTime,
    headerLabel,
  } = props;
  const [time, setTime] = useState<string | undefined>(
    initialTime ?? undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
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
            <ChakraText size="lg" color="primary.500" fontWeight={700}>
              {headerLabel ?? 'Custom Date'}
            </ChakraText>
            <HStack
              width="full"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <DatePicker
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date);
                  }
                }}
                dateFormat="mm/dd/yyyy"
                // showMonthDropdown
                // showYearDropdown
                minDate={minDate}
                maxDate={maxDate}
                selected={selectedDate}
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
                    : ''
                }
              />
              {shouldIncludeTime && (
                <VStack alignItems="flex-end" width="max-content" spacing="8px">
                  <ChakraText color="primary.500">
                    West Africa Standard Time
                  </ChakraText>
                  <HStack spacing="8px" as="button" onClick={onOpenTime}>
                    <ChakraText color="#0366EF">
                      {time
                        ? `${dateFormatter(time, 'hh:mm A', ['HH:mm'])}`
                        : 'Add a time'}
                    </ChakraText>
                    <Icon as={ClockIcon} boxSize="16px" color="#0366EF" />
                  </HStack>
                  {time && (
                    <HStack
                      spacing="8px"
                      as="button"
                      onClick={() => setTime(undefined)}
                    >
                      <ChakraText
                        color="#F50000"
                        fontSize="10px"
                        lineHeight="11.88px"
                      >
                        Remove Time
                      </ChakraText>
                      <Icon as={RemoveIcon} boxSize="12px" color="#F50000" />
                    </HStack>
                  )}
                </VStack>
              )}
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
                  if (handleSetDateTime) {
                    handleSetDateTime(selectedDate, time);
                  }
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
