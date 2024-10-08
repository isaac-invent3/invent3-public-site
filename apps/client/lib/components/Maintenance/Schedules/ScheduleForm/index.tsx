'use client';

import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Header from './Header';
import { FormikProvider, useFormik } from 'formik';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import ScheduleTitle from './Title';
import Type from './Type';
import Date from './Date';
import Plan from './Plan';
import Comment from './Comment';

interface ScheduleFormProps {
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { type } = props;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: null,
      planId: null,
      comments: null,
      scheduledDate: null,
      completionDate: null,
      statusId: null,
      ticketId: null,
    },
    validationSchema: scheduleSchema,
    enableReinitialize: true,
    onSubmit: async () => {},
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header type={type} />
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="45px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="37px"
            pl="16px"
            pb="33px"
            pr="30px"
            mt="40px"
            rounded="6px"
            minH="60vh"
          >
            <HStack alignItems="flex-start" width="full" spacing="40px">
              <ScheduleTitle />
              <Type />
            </HStack>
            <Date />
            <HStack alignItems="flex-start" width="full" spacing="40px">
              <Plan />
              <Comment />
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ScheduleForm;
