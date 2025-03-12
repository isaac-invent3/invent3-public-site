import { Heading, HStack, ModalBody, VStack } from '@chakra-ui/react';
import {
  Button,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { templateSchema } from '~/lib/schemas/general.schema';

export interface SaveAsTemplatePayload {
  templateName: string;
  templateDescription: string;
}

interface SaveReportAsTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSave: (payload: SaveAsTemplatePayload) => void;
  isLoading: boolean;
}

const SaveAsTemplateModal = (props: SaveReportAsTemplateModalProps) => {
  const { isOpen, onClose, handleSave, isLoading } = props;

  const formik = useFormik<SaveAsTemplatePayload>({
    initialValues: {
      templateName: '',
      templateDescription: '',
    },
    validationSchema: templateSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      handleSave(values);
      resetForm();
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { md: '526px' } }}
      mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              px="32px"
              pt="56px"
              pb="34px"
              spacing="56px"
              alignItems="center"
            >
              <VStack width="full" spacing="8px" alignItems="center">
                <Heading
                  fontWeight={800}
                  size={{ base: 'lg', md: 'xl' }}
                  color="primary.500"
                >
                  Save as Template?
                </Heading>
              </VStack>

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="24px">
                <Field
                  as={FormTextInput}
                  name="templateName"
                  type="text"
                  label="Template Name"
                />
                <Field
                  as={FormTextAreaInput}
                  name="templateDescription"
                  type="text"
                  label="Template Description"
                />
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px" justifyContent="center">
                <Button
                  variant="secondary"
                  customStyles={{ width: '96px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  customStyles={{ width: '250px' }}
                  isLoading={isLoading}
                  loadingText="Saving..."
                >
                  Save Template
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default SaveAsTemplateModal;
