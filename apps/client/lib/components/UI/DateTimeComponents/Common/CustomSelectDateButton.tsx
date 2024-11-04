import { HStack, Icon, Text, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import CustomDate from '../CustomDate';
import { dateFormatter } from '~/lib/utils/Formatters';

interface CustomSelectDateButtonProps {
  selectedDate?: Date | null;
  isDisabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  // eslint-disable-next-line no-unused-vars
  handleSelectedDate: (date: Date) => void;
  customStyle?: { [name: string]: unknown };
}
const CustomSelectDateButton = (props: CustomSelectDateButtonProps) => {
  const {
    selectedDate,
    isDisabled = false,
    customStyle,
    minDate,
    maxDate,
    handleSelectedDate,
  } = props;
  const today = moment().format('MMM DD, YYYY');
  const {
    isOpen: isOpenCustomDate,
    onOpen: onOpenCustomDate,
    onClose: onCloseCustomDate,
  } = useDisclosure();

  return (
    <>
      <HStack
        width="full"
        py="10px"
        px="8px"
        rounded="8px"
        justifyContent="space-between"
        bgColor="#F7F7F7"
        opacity={isDisabled ? 0.3 : 1}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        onClick={() => onOpenCustomDate()}
        {...customStyle}
      >
        <Text color="primary.500">
          {selectedDate ? dateFormatter(selectedDate, 'MMM DD, YYYY') : today}
        </Text>
        <Icon as={ChevronDownIcon} boxSize="16px" />
      </HStack>
      {isOpenCustomDate && (
        <CustomDate
          minDate={minDate}
          maxDate={maxDate}
          initialDate={selectedDate ?? undefined}
          isOpen={isOpenCustomDate}
          onClose={onCloseCustomDate}
          handleSetDateTime={(date) => {
            if (date) {
              handleSelectedDate(date);
            }
          }}
        />
      )}
    </>
  );
};

export default CustomSelectDateButton;
