import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import 'react-datepicker/dist/react-datepicker.css';
import { updateTemplateFilter } from '~/lib/redux/slices/MaintenanceSlice';
import { dateFormatter } from '~/lib/utils/Formatters';
import moment from 'moment';

const CreatedDate = () => {
  const dispatch = useAppDispatch();
  const { createdDate } = useAppSelector(
    (state) => state.maintenance.templateFilters
  );
  const pickerRef = useRef<DatePicker | null>(null);

  const handleButtonClick = () => {
    if (pickerRef.current) {
      pickerRef.current.setFocus();
    }
  };

  return (
    <Flex width="max-content" direction="column" position="relative">
      <HStack
        cursor="pointer"
        bgColor="white"
        width="max-content"
        height="36px"
        py="10px"
        px="12px"
        rounded="6px"
        border="1px solid #DADFE5"
        onClick={handleButtonClick}
      >
        <HStack spacing="8px">
          <Text width="full" whiteSpace="nowrap" color="neutral.600">
            Date Created:
          </Text>
          <HStack spacing="4px" fontWeight={700}>
            <Text fontWeight={700} whiteSpace="nowrap">
              {createdDate ?? '----'}
            </Text>
          </HStack>
        </HStack>
        <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
      </HStack>
      <DatePicker
        onChange={(date) => {
          const inputtedDate = dateFormatter(date as Date, `DD-MM-YYYY`);
          dispatch(updateTemplateFilter({ createdDate: inputtedDate }));
        }}
        dateFormat="mm/dd/yyyy"
        // showMonthDropdown
        // showYearDropdown
        selected={
          createdDate ? moment(createdDate, 'DD-MM-YYYY').toDate() : null
        }
        className="hidden-input"
        ref={pickerRef}
        portalId="date-picker-portal"
      />
    </Flex>
  );
};

export default CreatedDate;
