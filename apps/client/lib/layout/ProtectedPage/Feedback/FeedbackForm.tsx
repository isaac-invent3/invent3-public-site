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
import {
  Button,
  FileUpload,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import FeedbackFormSuccess from './FeedbackFormSuccess';

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackForm = (props: FeedbackFormModalProps) => {
  const { isOpen, onClose } = props;

  const {
    isOpen: isOpenFeedbackSuccess,
    onOpen: onOpenFeedbackSuccess,
    onClose: onCloseFeedbackSuccess,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: false,
    onSubmit: async (data) => {},
  });

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
              <Field
                as={FormTextInput}
                name="taskName"
                type="text"
                label="Task Title"
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
                name="subject"
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
                name="description"
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
              <FileUpload />
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

      <FeedbackFormSuccess
        isOpen={isOpenFeedbackSuccess}
        onClose={onOpenFeedbackSuccess}
      />
    </GenericModal>
  );
};

export default FeedbackForm;
