import {
  DrawerBody,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextAreaInput,
  GenericDrawer,
  GenericPopover,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import {
  useResolveFeedbackMutation,
  useUpdateFeedbackMutation,
} from '~/lib/redux/services/feedback.services';
import { updateFeedbackSchema } from '~/lib/schemas/feedback.schema';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';
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
  const session = useSession();
  const user = session?.data?.user;

  const handleClose = () => {
    onClose();
  };

  const [viewMore, setViewMore] = useState(false);

  const toast = useToast();
  const { handleSubmit } = useCustomMutation();

  const [updateFeedback, { isLoading: isUpdating }] =
    useUpdateFeedbackMutation();

  const [resolveFeedback, { isLoading: isResolving }] =
    useResolveFeedbackMutation();

  const formik = useFormik<Partial<Feedback>>({
    initialValues: data,
    validationSchema: updateFeedbackSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      if (!session) return;

      const payload = {
        ...values,
        lastModifiedBy: session?.user.username!,
      };

      const response = await updateFeedback({
        feedbackId: data.feedbackId,
        data: payload,
      });

      if (!response) return;

      toast({
        title: 'Feedback Updated Successfully!',
        status: 'success',
        position: 'top-right',
      });

      resetForm();
    },
  });

  const handleResolveFeedback = async () => {
    const session = await getSession();

    if (!session) return;

    await handleSubmit(
      resolveFeedback,
      {
        id: data.feedbackId,
        lastModifiedBy: session?.user.username!,
      },
      'Feedback Resolved Successfully!'
    );
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="507px">
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
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

                {user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ? (
                  // <CMFPopoverAction />
                  <GenericPopover width="189px" placement="bottom-start">
                    <VStack width="full" alignItems="flex-start" spacing="16px">
                      <Text as="button" type="submit" cursor="pointer">
                        Save Changes
                      </Text>
                      {!data.resolved && (
                        <Text
                          as="button"
                          onClick={handleResolveFeedback}
                          cursor="pointer"
                        >
                          Mark as Resolved
                        </Text>
                      )}

                      <Text cursor="pointer">Escalate to Super Admin</Text>
                    </VStack>
                  </GenericPopover>
                ) : (
                  <HStack spacing="8px">
                    <Button
                      type="submit"
                      isLoading={isUpdating}
                      customStyles={{ width: '107px', height: '35px' }}
                    >
                      Save Changes
                    </Button>

                    {!data.resolved && (
                      <Button
                        handleClick={handleResolveFeedback}
                        isLoading={isResolving}
                        customStyles={{ width: '139px', height: '35px' }}
                        variant="secondary"
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </HStack>
                )}
              </Stack>
            </DrawerHeader>

            <Flex direction="column" width="full">
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
                            name={`${data?.authorFirstName} ${data.authorLastName}`}
                            role={data.designationName ?? 'N/A'}
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
                          {viewMore
                            ? 'Minimize View More'
                            : 'Click to View More'}
                        </Text>
                      </HStack>

                      {viewMore && (
                        <>
                          <Description info={data?.description} />
                          <VStack spacing="8px" alignItems="center">
                            <Text fontWeight={700} color="neutral.600">
                              Attachment
                            </Text>

                            <Text>N/A</Text>
                          </VStack>
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
                      <VStack
                        width="full"
                        spacing="12px"
                        alignItems="flex-start"
                      >
                        <UserDisplayAndAddButton
                          selectedUser={formik.values?.assignedToFirstName}
                          handleSelectUser={(user) => {
                            formik.setFieldValue(
                              'assignedTo',
                              user?.value ?? null
                            );

                            formik.setFieldValue(
                              'assignedToFirstName',
                              user?.label ?? null
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
                        name="resolutionNote"
                        type="text"
                        label="Resolution"
                        placeholder="Resolution"
                        customStyle={{ height: '133px' }}
                      />
                    </FormInputWrapper>
                  </VStack>
                </Flex>
              </DrawerBody>
            </Flex>
          </FormikProvider>
        </form>
      </GenericDrawer>
    </>
  );
};

export default ViewFeedbackDrawer;
