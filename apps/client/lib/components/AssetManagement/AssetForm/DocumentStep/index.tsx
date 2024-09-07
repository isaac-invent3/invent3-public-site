import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { documentSchema } from '~/lib/schemas/asset.schema';
import FormActionButtons from '../FormActionButtons';
import AddDocument from './AddDocument';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';

interface DocumentStepProps {
  setFormDetails: React.Dispatch<React.SetStateAction<AssetFormDetails>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formDetails: AssetFormDetails;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { setActiveStep, setFormDetails, formDetails } = props;

  const initialValues = {
    documents: formDetails.documents ?? [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: documentSchema,
    onSubmit: async (values) => {
      console.log('Documents');
      setFormDetails((prev) => ({ ...prev, ...values }));
      setActiveStep(3);
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
