import { Flex, useMediaQuery, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { FormActionButtons, FormInputWrapper } from '@repo/ui/components';
import { Document } from '~/lib/interfaces/general.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';
import { documentSchema } from '~/lib/schemas/asset/main.schema';
import { ROUTES } from '~/lib/utils/constants';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';

interface DocumentStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const DocumentStep = (props: DocumentStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.user.userForm);
  const dispatch = useAppDispatch();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
            pt={{ base: '16px', lg: '26px' }}
            pl="16px"
            pb={{ base: '16px', lg: '24px' }}
            pr={{ base: '16px', lg: '41px' }}
            rounded="6px"
            spacing="51px"
            minH="60vh"
          >
            <FormInputWrapper
              title="Upload Documents"
              description="Attach related files for this user"
              isRequired={false}
              customSpacing="81px"
              sectionMaxWidth="141px"
            >
              <DocumentUploadAndView
                variant={isMobile ? 'secondary' : 'primary'}
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
            </FormInputWrapper>
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
