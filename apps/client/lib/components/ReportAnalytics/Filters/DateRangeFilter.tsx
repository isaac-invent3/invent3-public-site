import {
  Grid,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { DateRangePopover } from '@repo/ui/components';
import moment from 'moment';
import { useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface FilterDropDownProps {
  fromDate?: string;
  toDate?: string;
  minDate?: Date;
  maxDate?: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectedOption: (option: string, key: 'fromDate' | 'toDate') => void;
}

const DateRangeFilter = ({
  fromDate,
  maxDate,
  minDate,
  toDate,
  handleSelectedOption,
}: FilterDropDownProps) => {
  const { onToggle, isOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  const handleDateSelection = (
    date: Date | undefined,
    key: 'fromDate' | 'toDate'
  ) => {
    if (date) {
      handleSelectedOption(moment(date).format('DD/MM/YYYY'), key);
    }
  };

  const convertStringToDate = (date: string | undefined) => {
    return moment(date, 'DD/MM/YYYY').toDate() ?? undefined;
  };

  return (
    <>
      <Grid columnGap="7px" ref={containerRef} templateColumns="repeat(2, 1fr)">
        <HStack
          onClick={onToggle}
          cursor="pointer"
          bgColor="white"
          width="full"
          height="36px"
          py="10px"
          px="12px"
          rounded="6px"
          border="none"
        >
          <HStack spacing="8px">
            <Text width="full" whiteSpace="nowrap" color="neutral.600">
              From:
            </Text>

            <Text whiteSpace="nowrap">{fromDate}</Text>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
        </HStack>

        <HStack
          onClick={onToggle}
          cursor="pointer"
          bgColor="white"
          width="full"
          height="36px"
          py="10px"
          px="12px"
          rounded="6px"
          border="none"
        >
          <HStack spacing="8px">
            <Text width="full" whiteSpace="nowrap" color="neutral.600">
              To:
            </Text>

            <Text whiteSpace="nowrap">{toDate}</Text>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
        </HStack>

        <VStack gridColumn="span 2">
          <DateRangePopover
            isOpen={isOpen}
            minStartDate={minDate}
            maxEndDate={maxDate}
            handleChangeDate={(info) => {
              handleDateSelection(info.startDate, 'fromDate');
              handleDateSelection(info.endDate, 'toDate');
            }}
            dateRange={{
              startDate: convertStringToDate(fromDate),
              endDate: convertStringToDate(toDate),
            }}
          />
        </VStack>
      </Grid>
    </>
  );
};

export default DateRangeFilter;
