'use client';
import {
  Text as ChakraText,
  HStack,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Range as IRange } from 'react-date-range';
import DateRange, { BaseDateRangeProps } from '.';
import GenericModal from '../../Modal';
import Button from '../../Button';

interface DateRangeModalProps extends BaseDateRangeProps {
  isOpen: boolean;
  onClose: () => void;
  headerLabel?: string;
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

  const [selectedDateRange, setSelectedDateRange] = useState<
    IRange | undefined
  >(undefined);

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

            <DateRange
              minStartDate={minStartDate}
              maxEndDate={maxEndDate}
              dateRange={dateRange}
              handleChangeDate={(item) => setSelectedDateRange(item)}
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
                if (handleChangeDate && selectedDateRange) {
                  handleChangeDate(selectedDateRange);
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
