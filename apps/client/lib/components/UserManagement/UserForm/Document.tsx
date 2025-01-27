import { Flex, HStack, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { documentSchema } from '~/lib/schemas/asset/main.schema';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { FormActionButtons, FormSectionInfo } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';
import { Document } from '~/lib/interfaces/general.interfaces';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

interface DocumentStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();

  const initialValues = {
    documents: formDetails.documents ?? [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: documentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateUserForm(values));
      setActiveStep(4);
    },
  });

  const handleRemoveDocument = (document: Document) => {
    const updatedDocuments: Document[] = formik.values.documents.filter(
      (old: Document) => old !== document
    );
    formik.setFieldValue('documents', updatedDocuments);
  };

  return (
    <Flex
      width="full"
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
                  info="Attach related files for this user"
                  isRequired={false}
                />
              </Flex>
              <DocumentUploadAndView
                variant="primary"
                handleRemoveDocuments={(document) =>
                  handleRemoveDocument(document)
                }
                handleAddDocuments={(documents) =>
                  formik.setFieldValue('documents', [
                    ...formik.values.documents,
                    ...documents,
                  ])
                }
                documents={formik.values.documents}
                setError={(error) => formik.setErrors({ documents: error })}
                error={formik.errors.documents as string}
              />
            </HStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.USERS}`}
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
