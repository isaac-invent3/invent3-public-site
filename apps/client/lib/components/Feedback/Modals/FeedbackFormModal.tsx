import {
  Heading,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { UploadedFile } from '@repo/interfaces';
import {
  Button,
  FileUpload,
  FormInputWrapper,
  FormSelect,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import {
  CreateFeedbackAttachmentPayload,
  CreateFeedbackPayload,
} from '~/lib/interfaces/feedback.interfaces';
import { SideBarData } from '~/lib/interfaces/general.interfaces';
import { filterSidebarData } from '~/lib/layout/ProtectedPage/SideBar/utils';
import {
  useCreateFeedbackAttachmentMutation,
  useCreateFeedbackMutation,
} from '~/lib/redux/services/feedback.services';
import { createFeedbackSchema } from '~/lib/schemas/feedback.schema';
import { generateOptions } from '~/lib/utils/helperFunctions';
import FeedbackFormSuccessModal from './FeedbackFormSuccessModal';

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackFormPayload {
  createFeedbackDto: {
    subject: string;
    description: string;
    feedbackTypeId: number | null;
  };

  createFeedbackAttachmentDto: UploadedFile | null;
}

const FeedbackFormModal = (props: FeedbackFormModalProps) => {
  const { isOpen, onClose } = props;

  const { handleSubmit } = useCustomMutation();

  const {
    isOpen: isOpenFeedbackSuccess,
    onOpen: onOpenFeedbackSuccess,
    onClose: onCloseFeedbackSuccess,
  } = useDisclosure();

  const formattedUrl = useFormatUrl();
  const [createFeedback] = useCreateFeedbackMutation();
  const [createFeedbackAttachment] = useCreateFeedbackAttachmentMutation();

  const formik = useFormik<FeedbackFormPayload>({
    initialValues: {
      createFeedbackAttachmentDto: null,
      createFeedbackDto: {
        description: '',
        subject: '',
        feedbackTypeId: null,
      },
    },
    enableReinitialize: false,
    validationSchema: createFeedbackSchema,
    onSubmit: async (data, { resetForm }) => {
      const session = await getSession();

      if (!session) return;

      const payload: CreateFeedbackPayload = {
        ...data.createFeedbackDto,
        feedbackTypeId: data.createFeedbackDto.feedbackTypeId!,
        submittedDate: new Date().toISOString(),
        createdBy: session?.user.username!,
      };

      const feedback = await handleSubmit(createFeedback, payload);

      if (!feedback) return;

      const { createFeedbackAttachmentDto } = data;

      const feedbackAttachmentPayload: CreateFeedbackAttachmentPayload = {
        attachmentName: createFeedbackAttachmentDto?.fileName!,
        base64Attachment: createFeedbackAttachmentDto?.base64!,
        base64Prefix: createFeedbackAttachmentDto?.base64Prefix!,
        createdBy: session?.user.username!,
        feedbackId: feedback.data?.feedbackID!,
      };

      const feedbackAttachment = await handleSubmit(
        createFeedbackAttachment,
        feedbackAttachmentPayload
      );

      if (!feedbackAttachment) return;

      resetForm();
      onOpenFeedbackSuccess();
    },
  });

  const [isFetchingFeedbackTypes, setIsFetchingFeedbackTypes] = useState(false);

  const [feedbackTypes, setFeedbackTypes] = useState<SideBarData[]>([]);

  const fetchFeedbackTypes = async () => {
    setIsFetchingFeedbackTypes(true);

    try {
      const response = await filterSidebarData();
      const filteredData = response.filter((item) => Boolean(item.contextId));
      setFeedbackTypes(filteredData);

      setIsFetchingFeedbackTypes(false);
    } catch (error) {
      console.log(`error: ${error}`);

      setIsFetchingFeedbackTypes(false);
    }
  };

  useEffect(() => {
    fetchFeedbackTypes();
  }, []);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: { md: '713px' },
        px: { base: '16px', md: '48px' },
        py: { base: '32px', md: '48px' },
        bgColor: '#E7E7E7',
        maxW: '80vw',
      }}
    >
      <ModalHeader m={0} p={0}>
        <Heading
          as="h2"
          size={{ base: 'lg', lg: 'xl' }}
          color="black"
          fontWeight={800}
        >
          We value your feedback
        </Heading>
        <Text size="md" color="neutral.600" fontWeight={700} mt="1em">
          Report an Issue or Suggest an Improvement
        </Text>
      </ModalHeader>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          <ModalBody p={0} m={0} width="full">
            <VStack width="full" spacing="27px" mt="60px">
              <FormInputWrapper
                sectionMaxWidth="170px"
                customSpacing="50px"
                title="Feedback Type"
                description="Enter the approximate time to complete the task"
                isRequired
              >
                <FormSelect
                  name="createFeedbackDto.feedbackTypeId"
                  title="Feedback Type"
                  isLoading={isFetchingFeedbackTypes}
                  options={generateOptions(feedbackTypes, 'name', 'contextId')}
                  isSearchable
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="170px"
                customSpacing="50px"
                title="Subject"
                description="Provide essential information about the asset being added."
                isRequired
              >
                <Field
                  as={FormTextInput}
                  name="createFeedbackDto.subject"
                  type="text"
                  label="Subject"
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="170px"
                customSpacing="50px"
                title="Description"
                description="Provide essential information about the asset being added."
                isRequired
              >
                <Field
                  as={FormTextAreaInput}
                  name="createFeedbackDto.description"
                  type="text"
                  label="Description"
                />
              </FormInputWrapper>

              <FormInputWrapper
                sectionMaxWidth="170px"
                customSpacing="50px"
                title="Attach Screenshot or File"
                description="Attach related files for this asset"
                isRequired
              >
                <FileUpload
                  files={formik.values.createFeedbackAttachmentDto}
                  error={formik.errors.createFeedbackAttachmentDto}
                  isMulti={false}
                  handleAddFiles={(files) => {
                    formik.setFieldValue(
                      'createFeedbackAttachmentDto',
                      files[0]
                    );
                  }}
                />
              </FormInputWrapper>
            </VStack>
          </ModalBody>

          <ModalFooter p={0} m={0}>
            <HStack
              spacing="8px"
              w="full"
              justifyContent={{ base: 'space-between', md: 'flex-end' }}
              mt="8px"
              pt="32px"
            >
              <Button
                customStyles={{
                  width: { base: 'full', md: '138px' },
                  height: { base: '36px', md: '50px' },
                }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                customStyles={{
                  width: { base: 'full', md: '150px' },
                  height: { base: '36px', md: '50px' },
                }}
              >
                Submit Feedback
              </Button>
            </HStack>
          </ModalFooter>
        </FormikProvider>
      </form>

      <FeedbackFormSuccessModal
        isOpen={isOpenFeedbackSuccess}
        onClose={() => {
          onCloseFeedbackSuccess();
          onClose();
        }}
      />
    </GenericModal>
  );
};

export default FeedbackFormModal;
