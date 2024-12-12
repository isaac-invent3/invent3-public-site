import { Flex, HStack, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { documentSchema } from '~/lib/schemas/asset/main.schema';
import AddDocument from './AddDocument';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FormActionButtons, FormSectionInfo } from '@repo/ui/components';

interface DocumentStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const initialValues = {
    documents: formDetails.documents ?? [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: documentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateAssetForm(values));
      setActiveStep(4);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 3 ? 'flex' : 'none'}
    >
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
            minH="60vh"
          >
            <HStack width="full" alignItems="flex-start" spacing="81px">
              <Flex width="full" maxW="141px">
                <FormSectionInfo
                  title="Upload Documents"
                  info="Size max: 10MB each Format: TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPEG"
                  isRequired={false}
                />
              </Flex>
              <AddDocument />
            </HStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/asset-management"
              totalStep={4}
              activeStep={3}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default DocumentStep;
