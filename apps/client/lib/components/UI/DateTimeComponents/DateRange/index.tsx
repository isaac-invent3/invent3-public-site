'use client';
import { HStack, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import Button from '../../Button';
import GenericModal from '../../Modal';
import './styles.css';
import TimezoneDropdown from './TimeZoneDropdown';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;

  minStartDate?: Date;
  maxEndDate?: Date;
  dateRange?: Range | undefined;
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChangeDate?: (info: Range) => void;
}

const DateRangeModal = (props: DateRangeModalProps) => {
  const {
    isOpen,
    onClose,
    minStartDate,
    maxEndDate,
    isLoading,
    dateRange,
    handleChangeDate,
  } = props;

  const getInitialDateRange = (): Range[] => {
    if (dateRange) {
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

  const [selectedDateRange, setSelectedDateRange] = useState<Range[]>(
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
            <Text size="lg" color="primary.500" fontWeight={500}>
              Custom Date
            </Text>

            <DateRangePicker
              onChange={(item: any) => {
                if (!item.selection) return;

                setSelectedDateRange([item.selection]);

                if (handleChangeDate) {
                  handleChangeDate(item.selection);
                }
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
          justifyContent="space-between"
          pl="32px"
          pr="27px"
          mb="19px"
          mt="10px"
          alignItems="center"
        >
          <TimezoneDropdown
            width="250px"
            label="West Africa Standard Time"
            name="ticketStatusId"
            options={[]}
          />

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
              handleClick={() => console.log()}
              isLoading={isLoading}
              loadingText="Validating..."
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
