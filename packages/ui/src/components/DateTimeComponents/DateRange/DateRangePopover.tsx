'use client';
import { Collapse, VStack } from '@chakra-ui/react';
import DateRange, { BaseDateRangeProps } from '.';

interface DateRangePopoverProps extends BaseDateRangeProps {
  isOpen: boolean;
}

const DateRangePopover = (props: DateRangePopoverProps) => {
  const { minStartDate, maxEndDate, dateRange, handleChangeDate, isOpen } =
    props;

  return (
    <Collapse in={isOpen}>
      <VStack
        bgColor="white"
        p="24px"
        rounded="6px"
        mt="4px"
        position="absolute"
        zIndex={99}
        boxShadow="lg"
        maxW="max-content"
        left={6}
      >
        <DateRange
          minStartDate={minStartDate}
          maxEndDate={maxEndDate}
          dateRange={dateRange}
          handleChangeDate={(item) =>
            handleChangeDate && handleChangeDate(item)
          }
        />
      </VStack>
    </Collapse>
  );
};

export default DateRangePopover;
