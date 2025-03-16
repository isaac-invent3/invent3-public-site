import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextAreaInput,
  GenericDrawer,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import UserInfo from '../../Common/UserInfo';
import Description from '../../TicketManagement/Drawers/Common/Description';
import FeedbackDrawerHeader from '../Common/FeedbackDrawerHeader';

interface FeedbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Feedback;
}

const ViewFeedbackDrawer = (props: FeedbackDrawerProps) => {
  const { isOpen, onClose, data } = props;

  const handleClose = () => {
    onClose();
  };

  const [viewMore, setViewMore] = useState(false);

  const formik = useFormik<Partial<Feedback>>({
    initialValues: data,
    onSubmit(values, formikHelpers) {},
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="507px">
        <DrawerHeader p={0} m={0}>
          <Stack
            pt="16px"
            pb="32px"
            px={{ base: '16px', lg: '24px' }}
            width="full"
            justifyContent="space-between"
            direction={{ base: 'row' }}
          >
            <BackButton handleClick={handleClose} />

            <HStack spacing="8px">
              <Button customStyles={{ width: '107px', height: '35px' }}>
                Save Changes
              </Button>

              <Button
                customStyles={{ width: '139px', height: '35px' }}
                variant="secondary"
              >
                Mark as Completed
              </Button>
            </HStack>
          </Stack>
        </DrawerHeader>

        <Flex direction="column" width="full">
          <FormikProvider value={formik}>
            <DrawerBody p={0} m={0}>
              <Flex
                direction="column"
                width="full"
                alignItems="flex-start"
                pb="20px"
              >
                <Heading
                  size={{ base: 'lg', lg: 'xl' }}
                  color="#0E2642"
                  fontWeight={800}
                  px="24px"
                  pb="16px"
                >
                  Feedback Detail
                </Heading>

                <FeedbackDrawerHeader data={data} />

                <VStack width="full" px="24px" mb="24px">
                  <VStack
                    width="full"
                    alignItems="flex-start"
                    spacing="32px"
                    borderBottom="0.5px solid #838383"
                    py="24px"
                  >
                    <HStack
                      width="full"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing="40px"
                    >
                      <VStack spacing="8px" alignItems="flex-start">
                        <Text fontWeight={700} color="neutral.600">
                          Submitted by
                        </Text>

                        <UserInfo
                          name={data?.createdBy}
                          customAvatarStyle={{
                            width: '24px',
                            height: '24px',
                          }}
                        />
                      </VStack>

                      <VStack spacing="8px" alignItems="center">
                        <Text fontWeight={700} color="neutral.600">
                          Company
                        </Text>

                        <Text>{data.companyName ?? 'N/A'}</Text>
                      </VStack>

                      <Text
                        fontWeight={500}
                        color="#0366EF"
                        cursor="pointer"
                        onClick={() => setViewMore(!viewMore)}
                      >
                        {viewMore ? 'Minimize View More' : 'Click to View More'}
                      </Text>
                    </HStack>

                    {viewMore && (
                      <>
                        <Description info={data?.description} />
                      </>
                    )}
                  </VStack>
                </VStack>

                <VStack px="24px" width="full" alignItems="start">
                  <Text size="lg" color="black" fontWeight={700} mb="1em">
                    Resolution
                  </Text>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    pb="16px"
                    description="Select the person responsible for this ticket"
                    title="Assign To"
                    isRequired
                  >
                    <VStack width="full" spacing="12px" alignItems="flex-start">
                      <UserDisplayAndAddButton
                        selectedUser={null}
                        handleSelectUser={(user) => {
                          formik.setFieldValue(
                            'assignedTo',
                            user?.value ?? null
                          );
                        }}
                        sectionInfoTitle="Assign To"
                      />

                      {formik.submitCount > 0 &&
                        formik.touched &&
                        formik.errors.assignedTo !== undefined && (
                          <ErrorMessage>
                            {formik.errors.assignedTo}
                          </ErrorMessage>
                        )}
                    </VStack>
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide details about the resolution objective"
                    title="Resolution Note"
                    isRequired
                  >
                    <Field
                      as={FormTextAreaInput}
                      name="issueDescription"
                      type="text"
                      label="Resolution"
                      placeholder="Resolution"
                      customStyle={{ height: '133px' }}
                    />
                  </FormInputWrapper>
                </VStack>
              </Flex>
            </DrawerBody>
          </FormikProvider>
        </Flex>
      </GenericDrawer>
    </>
  );
};

export default ViewFeedbackDrawer;
