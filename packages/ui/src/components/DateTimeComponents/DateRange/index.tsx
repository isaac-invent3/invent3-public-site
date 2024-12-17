'use client';
import {
  HStack,
  ModalBody,
  ModalFooter,
  Text as ChakraText,
  VStack,
} from '@chakra-ui/react';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, Range as DateRange } from 'react-date-range';
import './styles.css';
import Button from '../../Button';
import GenericModal from '../..//Modal';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  minStartDate?: Date;
  maxEndDate?: Date;
  dateRange?: DateRange | undefined;
  headerLabel?: string;
  // eslint-disable-next-line no-unused-vars
  handleChangeDate?: (info: DateRange) => void;
}

const DateRangeModal = (props: DateRangeModalProps) => {
  const {
    isOpen,
    onClose,
    minStartDate,
    maxEndDate,
    dateRange,
    handleChangeDate,
    headerLabel,
  } = props;

  const getInitialDateRange = (): DateRange[] => {
    if (dateRange && dateRange?.startDate && dateRange?.endDate) {
      return [dateRange];
    }
    return [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    ];
  };

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange[]>(
    getInitialDateRange()
  );

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { lg: '560px' } }}
      >
        <ModalBody m={0} p={0} py="32px" pl="32px" pr="27px" width="full">
          <VStack width="full" alignItems="flex-start" spacing="24px">
            <ChakraText size="lg" color="primary.500" fontWeight={500}>
              {headerLabel ?? 'Custom Date'}
            </ChakraText>

            <DateRangePicker
              onChange={(item: any) => {
                setSelectedDateRange([item?.selection ?? item?.range1]);
              }}
              showPreview
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={selectedDateRange}
              direction="horizontal"
              weekStartsOn={1}
              monthDisplayFormat="LLLL yyy"
              minDate={minStartDate}
              maxDate={maxEndDate}
            />
          </VStack>
        </ModalBody>

        <ModalFooter
          p={0}
          m={0}
          width="full"
          justifyContent="flex-end"
          pl="32px"
          pr="27px"
          mb="19px"
          mt="10px"
          alignItems="center"
        >
          <HStack spacing="16px" width="full" justifyContent="flex-end">
            <Button
              variant="secondary"
              customStyles={{ width: '116px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              customStyles={{ w: '116px' }}
              handleClick={() => {
                if (handleChangeDate && selectedDateRange.length > 0) {
                  handleChangeDate(
                    selectedDateRange[selectedDateRange.length - 1] as DateRange
                  );
                }
                onClose();
              }}
            >
              Done
            </Button>
          </HStack>
        </ModalFooter>
      </GenericModal>
    </>
  );
};

export default DateRangeModal;
