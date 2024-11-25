import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { dateFormatter } from '~/lib/utils/Formatters';

interface FilterDropDownProps {
  label: string;
  selectedDate: string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleClick: (date: string) => void;
  minDate?: Date;
  maxDate?: Date | undefined;
}

const DateFilter = ({
  label,
  handleClick,
  maxDate,
  minDate,
  selectedDate
}: FilterDropDownProps) => {
  const { onToggle, isOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  return (
    <Flex direction="column" width="full" maxW="max-content" ref={containerRef}>
      <HStack
        onClick={onToggle}
        cursor="pointer"
        bgColor="white"
        width="full"
        height="36px"
        py="10px"
        px="12px"
        rounded="6px"
        ref={buttonRef}
        border="none"
      >
        <HStack spacing="8px">
          <Text width="full" whiteSpace="nowrap" color="neutral.600">
            {label}
          </Text>

          <Text whiteSpace="nowrap">
            {selectedDate}
          </Text>
        </HStack>
        <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
      </HStack>

      <Collapse in={isOpen}>
        <VStack position="absolute" zIndex={99}>
          <DatePicker
            onChange={(date) => {
              const inputtedDate = dateFormatter(date as Date, `DD-MM-YYYY`);
              if (inputtedDate) {
                handleClick(inputtedDate);
              }
            }}
            dateFormat="mm-dd-yyyy"
            showMonthDropdown
            showYearDropdown
            minDate={minDate}
            maxDate={maxDate}
            className="hidden-input "
            open
          />
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default DateFilter;
