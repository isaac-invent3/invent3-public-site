/* eslint-disable no-unused-vars */
import {
  Grid,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button, DateRange } from '@repo/ui/components';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface FilterDropDownProps {
  fromDate?: string;
  toDate?: string;
  minDate?: Date;
  maxDate?: Date | undefined;
  handleSelectedOption: ({
    fromDate,
    toDate,
  }: {
    fromDate: string;
    toDate: string;
  }) => void;
}

const DateRangeFilter = ({
  fromDate,
  maxDate,
  minDate,
  toDate,
  handleSelectedOption,
}: FilterDropDownProps) => {
  const { onOpen, isOpen, onClose, onToggle } = useDisclosure();
  const [range, setRange] = useState<Range | undefined>(undefined);

  const handleDateSelection = () => {
    if (range) {
      handleSelectedOption({
        fromDate: moment(range.startDate).format('DD/MM/YYYY'),
        toDate: moment(range.endDate).format('DD/MM/YYYY'),
      });
    }
    onClose();
  };

  const convertStringToDate = (date: string | undefined) => {
    return moment(date, 'DD/MM/YYYY').toDate() ?? undefined;
  };

  const memoizedDateRange = useMemo(() => {
    return {
      startDate: fromDate ? convertStringToDate(fromDate) : undefined,
      endDate: toDate ? convertStringToDate(toDate) : undefined,
      key: 'selection',
    };
  }, [fromDate, toDate]);

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
          width="max-content"
          height="36px"
          rounded="6px"
          border="none"
          py="10px"
          px="12px"
          bgColor="white"
        >
          <HStack spacing="8px">
            <Text width="full" whiteSpace="nowrap" color="neutral.600">
              Date Range:
            </Text>

            <Text whiteSpace="nowrap">
              {fromDate} - {toDate}
            </Text>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
        </HStack>
      </PopoverTrigger>
      <PopoverContent
        p={0}
        m={0}
        position="relative"
        zIndex="999"
        width="min-content"
        rounded="8px"
        border="none"
        overflow="hidden"
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
        <PopoverBody pb="20px" px="20px">
          <VStack alignItems="flex-end">
            <DateRange
              minStartDate={minDate}
              maxEndDate={maxDate}
              handleChangeDate={(info) => {
                setRange(info);
              }}
              dateRange={memoizedDateRange}
            />
            <Button
              handleClick={() => handleDateSelection()}
              customStyles={{ width: 'max-content', height: '35px' }}
            >
              Apply
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
