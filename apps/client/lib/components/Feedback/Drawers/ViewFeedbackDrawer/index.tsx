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
  LoadingSpinner,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import {
  useGetAFeedbackQuery,
  useResolveFeedbackMutation,
  useUpdateFeedbackMutation,
} from '~/lib/redux/services/feedback.services';
import { updateFeedbackSchema } from '~/lib/schemas/feedback.schema';
import { ROLE_IDS_ENUM, SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import FeedbackDrawerHeader from '../../Common/FeedbackDrawerHeader';
import UserInfo from '~/lib/components/Common/UserInfo';
import Description from '~/lib/components/TicketManagement/Drawers/Common/Description';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import FeedbackAttachments from './FeedbackAttachments';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';

interface FeedbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Feedback;
}

const ViewFeedbackDrawer = (props: FeedbackDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const session = useSession();
  const user = session?.data?.user;
  const feedbackSlug = SYSTEM_CONTEXT_DETAILS.FEEDBACK.slug;
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();

  const feedbackId = getSearchParam(feedbackSlug)
    ? Number(getSearchParam(feedbackSlug))
    : null;

  const {
    data: feedbackData,
    isLoading,
    isFetching,
  } = useGetAFeedbackQuery(
    { id: feedbackId! },
    {
      skip: !feedbackId || Boolean(data),
    }
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(feedbackSlug, { removeSelf: true });
    onClose();
  };

  const feedback = useMemo(() => {
    return feedbackData?.data?.feedback;
  }, [feedbackData]);

  const feedbackNotFound = useMemo(() => {
    const notFound = !feedback && !isLoading && !isFetching;
    if (notFound) clearSearchParamsAfter(feedbackSlug);

    return notFound;
  }, [feedback, isLoading]);

  const [viewMore, setViewMore] = useState(false);

  const toast = useToast();
  const { handleSubmit } = useCustomMutation();

  const [updateFeedback, { isLoading: isUpdating }] =
    useUpdateFeedbackMutation();

  const [resolveFeedback, { isLoading: isResolving }] =
    useResolveFeedbackMutation();

  const formik = useFormik<Partial<Feedback>>({
    initialValues: {
      assignedTo: feedback?.assignedTo ?? null,
      resolutionNote: feedback?.resolutionNote ?? '',
      statusId: feedback?.statusId ?? null,
    },
    enableReinitialize: true,
    validationSchema: updateFeedbackSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      if (!session) return;

      const payload = {
        ...values,
        feedbackId: feedback?.feedbackId!,
        lastModifiedBy: session?.user.username!,
      };

      const response = await updateFeedback({
        feedbackId: feedback?.feedbackId!,
        data: payload,
      });

      if (response?.data) {
        toast({
          title: 'Feedback Updated Successfully!',
          status: 'success',
          position: 'top-right',
        });
        resetForm();
        closeDrawer();
      }
    },
  });

  const handleResolveFeedback = async () => {
    const session = await getSession();

    if (!session) return;

    await handleSubmit(
      resolveFeedback,
      {
        id: feedback?.feedbackId!,
        lastModifiedBy: session?.user.username!,
      },
      'Feedback Resolved Successfully!',
      () => {
        closeDrawer();
      }
    );
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={closeDrawer} maxWidth="507px">
        {feedbackNotFound && (
          <GenericErrorState
            title="Error: Feedback Not Found!"
            subtitle="The Selected Feedback Could not be found"
          />
        )}

        {(isLoading || isFetching) && (
          <VStack width="full" minH="100vh" justifyContent="center">
            <LoadingSpinner />
          </VStack>
        )}
        {feedback && !isLoading && !isFetching && (
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
                  <BackButton handleClick={closeDrawer} />

                  {user?.roleIds.includes(ROLE_IDS_ENUM.THIRD_PARTY) ? (
                    // <CMFPopoverAction />
                    <GenericPopover width="189px" placement="bottom-start">
                      <VStack
                        width="full"
                        alignItems="flex-start"
                        spacing="16px"
                      >
                        <Text
                          as="button"
                          type="submit"
                          cursor="pointer"
                          onClick={() => console.log({ error: formik.errors })}
                        >
                          Save Changes
                        </Text>
                        {!feedback?.resolved && (
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

                      {!feedback.resolved && (
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

                    <FeedbackDrawerHeader data={feedback} />

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
                              name={`${feedback?.authorFirstName} ${feedback.authorLastName}`}
                              role={feedback.designationName ?? 'N/A'}
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

                            <Text>{feedback.companyName ?? 'N/A'}</Text>
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
                            <Description info={feedback?.description} />
                            <VStack spacing="8px" alignItems="flex-start">
                              <Text fontWeight={700} color="neutral.600">
                                Attachment
                              </Text>
                              <FeedbackAttachments id={feedback.feedbackId} />
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
        )}
      </GenericDrawer>
    </>
  );
};

export default ViewFeedbackDrawer;
