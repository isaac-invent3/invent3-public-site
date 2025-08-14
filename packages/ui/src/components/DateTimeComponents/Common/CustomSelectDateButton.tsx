/* eslint-disable no-unused-vars */
import {
  HStack,
  Icon,
  Text as ChakraText,
  useDisclosure,
  VStack,
  StackProps,
} from '@chakra-ui/react';
import moment from 'moment';

import { ChevronDownIcon, ClockIcon, RemoveIcon } from '../../CustomIcons';
import CustomDate from '../CustomDate';
import AddTime from '../AddTime';
import dateFormatter from '../../../utils/HelperFunctions/dateFormatter';

interface CustomSelectDateButtonProps {
  selectedDate?: Date | null;
  selectedTime?: string | null;
  isDisabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  handleSelectedDateTime: (
    date: Date | undefined,
    time: string | undefined
  ) => void;
  customStyle?: StackProps;
  includeTimeDisplay?: boolean;
  dateDisplay?: string | null;
}
const CustomSelectDateButton = (props: CustomSelectDateButtonProps) => {
  const {
    selectedDate,
    selectedTime,
    isDisabled = false,
    customStyle,
    minDate,
    maxDate,
    handleSelectedDateTime,
    includeTimeDisplay = false,
    dateDisplay,
  } = props;
  const today = moment().format('MMM DD, YYYY');
  const {
    isOpen: isOpenCustomDate,
    onOpen: onOpenCustomDate,
    onClose: onCloseCustomDate,
  } = useDisclosure();
  const {
    isOpen: isOpenTime,
    onOpen: onOpenTime,
    onClose: onCloseTime,
  } = useDisclosure();

  return (
    <>
      <HStack spacing="24px" flexWrap="wrap" opacity={isDisabled ? 0.3 : 1}>
        <HStack
          width="full"
          py="10px"
          px="8px"
          rounded="8px"
          justifyContent="space-between"
          bgColor="#F7F7F7"
          onClick={() => onOpenCustomDate()}
          opacity={isDisabled ? 0.3 : 1}
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          {...customStyle}
        >
          <ChakraText color="primary.500">
            {selectedDate
              ? dateFormatter(selectedDate, dateDisplay ?? `MMM DD, YYYY`)
              : today}
          </ChakraText>
          <Icon as={ChevronDownIcon} boxSize="16px" />
        </HStack>
        {includeTimeDisplay && (
          <VStack alignItems="flex-end" width="max-content" spacing="8px">
            <HStack spacing="8px" cursor="pointer" onClick={onOpenTime}>
              <ChakraText color="#0366EF">
                {selectedTime
                  ? `${dateFormatter(selectedTime, 'hh:mm A', ['HH:mm'])}`
                  : 'Add a time'}
              </ChakraText>
              <Icon as={ClockIcon} boxSize="16px" color="#0366EF" />
            </HStack>
            {selectedTime && (
              <HStack
                spacing="8px"
                as="button"
                onClick={() =>
                  handleSelectedDateTime(selectedDate ?? undefined, undefined)
                }
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
      {isOpenCustomDate && (
        <CustomDate
          minDate={minDate}
          maxDate={maxDate}
          initialDate={selectedDate ?? undefined}
          initialTime={selectedTime ?? undefined}
          isOpen={isOpenCustomDate}
          onClose={onCloseCustomDate}
          shouldIncludeTime={false}
          handleSetDateTime={(date, time) => {
            handleSelectedDateTime(date, time);
          }}
        />
      )}
      {isOpenTime && (
        <AddTime
          isOpen={isOpenTime}
          onClose={onCloseTime}
          handleSelectedTime={(time) =>
            handleSelectedDateTime(selectedDate ?? undefined, time ?? null)
          }
        />
      )}
    </>
  );
};

export default CustomSelectDateButton;
