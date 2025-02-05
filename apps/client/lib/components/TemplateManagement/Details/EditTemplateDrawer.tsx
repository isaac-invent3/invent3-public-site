import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  BackButton,
  Button,
  DateTimeButtons,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericDrawer,
  GenericSuccessModal,
  ModalHeading,
} from '@repo/ui/components';
import { useUpdateTemplateMutation } from '~/lib/redux/services/template.services';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { getSession } from 'next-auth/react';
import { updateTemplateSchema } from '~/lib/schemas/template.schema';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import moment from 'moment';
import { setTemplate } from '~/lib/redux/slices/TemplateSlice';

interface EditTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const EditTemplateDrawer = (props: EditTemplateDrawerProps) => {
  const { isOpen, onClose } = props;
  const template = useAppSelector((state) => state.template.template);
  const { handleSubmit } = useCustomMutation();
  const [editTemplate, { isLoading }] = useUpdateTemplateMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      templateName: template?.templateName ?? '',
      description: template?.description ?? '',
    },
    validationSchema: updateTemplateSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const session = await getSession();
      const response = await handleSubmit(
        editTemplate,
        {
          templateId: template?.templateId!,
          templateName: values.templateName,
          description: values.description,
          lastModifiedBy: session?.user?.username!,
        },
        ''
      );
      if (response?.data) {
        if (template) {
          dispatch(setTemplate({ ...template, ...values }));
        }
        onOpenSuccess();
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="681px">
        <DrawerHeader
          p={0}
          m={0}
          px={{ base: '16px', md: '32px' }}
          mt="20px"
          mb="10px"
          width="max-content"
        >
          <BackButton handleClick={onClose} />
        </DrawerHeader>
        <DrawerBody p={0} m={0}>
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px={{ base: '16px', md: '32px' }}
                pb={{ base: '16px', md: '32px' }}
                pt={{ base: '20px', md: '50px' }}
                spacing={0}
                alignItems="flex-start"
              >
                <ModalHeading heading="Edit Template" />

                {/* Main Form Starts Here */}
                <VStack
                  width="full"
                  spacing={{ base: '24px', md: '96px' }}
                  mt={{ base: '34px', md: '60px' }}
                >
                  <VStack width="full" spacing={{ base: '24px', lg: '16px' }}>
                    <FormInputWrapper
                      sectionMaxWidth="118px"
                      spacing="47px"
                      description="Enter a clear title for this template"
                      title="Template Name"
                      isRequired
                    >
                      <Field
                        as={FormTextInput}
                        name="templateName"
                        type="text"
                        label="Template Name"
                      />
                    </FormInputWrapper>

                    <FormInputWrapper
                      sectionMaxWidth="118px"
                      spacing="47px"
                      description="Provide details about the Template"
                      title="Description"
                      isRequired
                    >
                      <Field
                        as={FormTextAreaInput}
                        name="description"
                        type="text"
                        label="Description"
                        placeholder="Description"
                        customStyle={{ height: '133px' }}
                      />
                    </FormInputWrapper>
                  </VStack>
                  <VStack
                    width="full"
                    alignItems="flex-start"
                    spacing="16px"
                    opacity="0.5"
                    pointerEvents="none"
                  >
                    <FormInputWrapper
                      sectionMaxWidth="118px"
                      spacing="47px"
                      description="Name of user that the ticket is assigned to"
                      title="Created By"
                    >
                      <UserDisplayAndAddButton
                        selectedUser={template?.createdBy ?? ''}
                        handleSelectUser={() => {}}
                        sectionInfoTitle="Created BY"
                      />
                    </FormInputWrapper>

                    <FormInputWrapper
                      sectionMaxWidth="118px"
                      spacing="47px"
                      description="Date when this template was created"
                      title="Created Date"
                      alignItems={{ lg: 'center' }}
                    >
                      <DateTimeButtons
                        selectedDate={moment(template?.dateCreated).format(
                          'DD/MM/YYYY'
                        )}
                        includeTime={false}
                        buttonVariant="secondary"
                      />
                    </FormInputWrapper>
                  </VStack>
                </VStack>
                {/* Main Form Ends Here */}
              </VStack>
            </form>
          </FormikProvider>
        </DrawerBody>
        <DrawerFooter pb="38px">
          <HStack width="full" spacing="16px" justifyContent="flex-end">
            <Button
              variant="secondary"
              customStyles={{ width: '138px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              customStyles={{ width: '237px' }}
              isLoading={isLoading || formik.isSubmitting}
              loadingText="Updating"
              handleClick={formik.handleSubmit}
            >
              Save Template
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
      <GenericSuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        successText="Template Info Updated Successfully"
      >
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default EditTemplateDrawer;
