import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { acquisitionInfoSchema } from '~/lib/schemas/asset.schema';
import FormActionButtons from '../FormActionButtons';
import AddDocument from './AddDocument';
interface DocumentStepProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { setActiveStep } = props;

  const initialValues = {
    documents: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: acquisitionInfoSchema,
    onSubmit: async () => {
      setActiveStep(1);
    },
  });

  return (
    <Flex width="full" height="full" direction="column">
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="24px"
            pr="41px"
            rounded="6px"
            spacing="51px"
          >
            <AddDocument />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons activeStep={1} setActiveStep={setActiveStep} />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default DocumentStep;
