import {
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text as ChakraText,
  useDisclosure,
  VStack,
  StackProps,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '../../CustomIcons';
import CommonDatePicker from '../Common/CommonDatePicker';
import moment from 'moment';

interface DatePopoverProps {
  minDate?: Date;
  maxDate?: Date;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: Date) => void;
  selectedDate: Date | undefined;
  label?: string;
  variant?: 'primary' | 'secondary';
  customStyle?: StackProps;
}
const DatePopover = (props: DatePopoverProps) => {
  const {
    minDate,
    maxDate,
    setSelectedDate,
    selectedDate,
    label,
    customStyle,
  } = props;

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <HStack
          onClick={onToggle}
          cursor="pointer"
          bgColor="white"
          width="max-content"
          height="36px"
          py="10px"
          px="12px"
          rounded="6px"
          border="none"
          {...customStyle}
        >
          <HStack spacing="8px">
            <ChakraText width="full" whiteSpace="nowrap" color="neutral.600">
              {label ?? 'Date:'}
            </ChakraText>

            <ChakraText whiteSpace="nowrap">
              {selectedDate
                ? moment(selectedDate).format('DD-MM-YYYY')
                : '-----'}
            </ChakraText>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
        </HStack>
      </PopoverTrigger>
      <PopoverContent
        p={0}
        m={0}
        position="relative"
        zIndex="999"
        width="267px"
        rounded="8px"
        border="none"
        overflow="hidden"
        boxShadow="lg"
        outline={0}
        _focus={{
          borderColor: 'transparent',
        }}
        _active={{
          borderColor: 'transparent',
        }}
        _focusVisible={{
          borderColor: 'transparent',
        }}
      >
        <PopoverBody pt="32px" pb="20px" px="20px">
          <VStack alignItems="flex-start" spacing="8px">
            <CommonDatePicker
              minDate={minDate}
              maxDate={maxDate}
              selectedDate={selectedDate}
              setSelectedDate={(date) => setSelectedDate(date)}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DatePopover;
