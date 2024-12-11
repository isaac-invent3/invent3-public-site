import React, { useEffect, useState } from 'react';
import GenericModal from '../../Modal';
import {
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { RecurrenceInfo } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import Summary from './Summary';
import moment from 'moment';
import { FormikProvider, useFormik } from 'formik';
import { recurrenceSchema } from '~/lib/schemas/general.schema';
import Frequency from './Frequency';
import Intervals from './Intervals';
import StartDateTime from './StartDateTime';
import EndDateTime from './EndDateTime';
import { updateRecurrence } from '~/lib/redux/slices/DateSlice';

interface RecurrenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  minStartDate?: Date;
  maxStartDate?: Date;
  maxEndDate?: Date;
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSetRecurrence: (info: RecurrenceInfo) => void;
}

const RecurrenceModal = (props: RecurrenceModalProps) => {
  const {
    isOpen,
    onClose,
    minStartDate,
    maxStartDate,
    maxEndDate,
    isLoading,
    handleSetRecurrence,
  } = props;
  const dispatch = useAppDispatch();
  const recurrence = useAppSelector((state) => state.date.info.recurrence);
  const [maxInterval, setMaxInterval] = useState(1);

  const formik = useFormik({
    initialValues: {
      startDate: recurrence.startDate
        ? `${moment(recurrence.startDate).format('DD/MM/YYYY')}${recurrence.startTime ? ` ${recurrence.startTime}` : ''}`
        : null,
      endDate: recurrence.endDate
        ? `${moment(recurrence.endDate).format('DD/MM/YYYY')}${recurrence.endTime ? ` ${recurrence.endTime}` : ''}`
        : null,
    },
    validationSchema: recurrenceSchema(
      moment(minStartDate).format('DD/MM/YYYY'),
      moment(recurrence.startDate).format('DD/MM/YYYY')
    ),
    enableReinitialize: true,
    onSubmit: async () => {
      handleSetRecurrence(recurrence);
    },
  });

  useEffect(() => {
    if (!recurrence.startDate) {
      dispatch(updateRecurrence({ startDate: moment().toISOString() }));
    }
  }, [recurrence.startDate]);

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { lg: '526px' } }}
      >
        <ModalHeader m={0} p={0} mt="32px" mb="10px" pl="32px" pr="27px">
          <Text size="lg" color="primary.500" fontWeight={700}>
            Custom Occurence
          </Text>
        </ModalHeader>
        <ModalBody
          p={0}
          m={0}
          width="full"
          // pointerEvents={isLoading ? 'none' : 'initial'}
          pl="32px"
          pr="27px"
        >
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack width="full" mt="40px" pb="71px" spacing="0px">
                <Frequency setMaxInterval={setMaxInterval} />
                <Intervals maxInterval={maxInterval} />
                <StartDateTime
                  minStartDate={minStartDate}
                  maxStartDate={maxStartDate}
                />
                <EndDateTime
                  minEndDate={
                    recurrence.startDate
                      ? moment(recurrence.startDate).toDate()
                      : undefined
                  }
                  maxEndDate={maxEndDate}
                />
              </VStack>
            </form>
          </FormikProvider>
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
          alignItems="flex-start"
        >
          <Summary />
          <HStack spacing="16px" width="full" justifyContent="flex-end">
            <Button
              variant="secondary"
              customStyles={{ width: '116px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              customStyles={{ minW: '116px' }}
              handleClick={() => formik.handleSubmit()}
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

export default RecurrenceModal;
