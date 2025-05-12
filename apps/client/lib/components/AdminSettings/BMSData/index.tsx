import { VStack } from '@chakra-ui/react';
import React from 'react';
import GeneralOverview from './GeneralOverview';
import { FormikProvider, useFormik } from 'formik';

const BMSData = () => {
  const formik = useFormik({
    initialValues: {
      languageId: '',
      automaticTimeZoneId: '',
      dateFormatId: '',
    },
    // validationSchema: generalSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {},
  });

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack spacing="24px" width="full" alignItems="flex-end">
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            p={{ base: '16px', md: '24px' }}
            pt={{ base: '23px', lg: '35px' }}
            rounded={{ md: '6px' }}
            minH={{ base: '60vh' }}
          >
            <GeneralOverview />
          </VStack>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default BMSData;
