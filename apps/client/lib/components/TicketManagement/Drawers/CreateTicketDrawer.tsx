import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericDrawer,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import AssetSelect from '~/lib/components/Common/SelectComponents/AssetSelect';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { CreateTicketForm } from '~/lib/interfaces/ticket.interfaces';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useCreateTicketMutation } from '~/lib/redux/services/ticket.services';
import { createTicketSchema } from '~/lib/schemas/ticket.schema';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import {
  generateOptions,
  getSelectedOption,
} from '~/lib/utils/helperFunctions';
import CreateTicketSuccessModal from '../Modals/CreateTicketSuccessModal';
import TicketTypeSelect from './Common/TicketTypeSelect';

interface CreateTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  asset?: Asset;
}

const CreateTicketDrawer = (props: CreateTicketDrawerProps) => {
  const { isOpen, onClose, asset } = props;
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();

  const { data: ticketPriorities } = useGetAllTaskPrioritiesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: 1,
  });

  const [createTicketMutation, { isLoading: isCreatingTicket }] =
    useCreateTicketMutation();

  const initialValues = {
    ticketTitle: '',
    issueDescription: '',
    assetId: asset?.assetId ?? null,
    reportedByEmployeeId: null,
    reportedByEmployeeName: null,
    assignedTo: null,
    assignedToEmployeeName: null,
    ticketTypeId: null,
    ticketPriorityId: null,
    issueReportDate: moment(new Date().toISOString()).utcOffset(
      0,
      true
    ) as unknown as string,
  };

  const formik = useFormik<CreateTicketForm>({
    initialValues,
    enableReinitialize: false,
    validationSchema: createTicketSchema,
    onSubmit: async (data) => {
      const session = await getSession();

      /* eslint-disable no-unused-vars */
      const { assignedToEmployeeName, reportedByEmployeeName, ...payload } =
        data;

      const response = await handleSubmit(
        createTicketMutation,
        {
          ...payload,
          createdBy: session?.user.id,
        },
        ''
      );

      if (response?.data) {
        formik.resetForm();
        onOpenSuccess();
      }
    },
  });

  const ticketPriorityOptions = generateOptions(
    ticketPriorities?.data.items,
    'priority',
    'taskPriorityId'
  );

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="535px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="32px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />
          </HStack>
        </DrawerHeader>
        <FormikProvider value={formik}>
          <DrawerBody p={0}>
            <Flex
              direction="column"
              width="full"
              alignItems="flex-start"
              pb="20px"
            >
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                color="black"
                px="24px"
                pb="20px"
                fontWeight={800}
              >
                Add New Ticket
              </Heading>

              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack
                  width="full"
                  spacing={{ base: '38px', lg: '24px' }}
                  px="24px"
                  mt="22px"
                >
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Enter a clear title for this ticket"
                    title="Ticket Title"
                    isRequired
                  >
                    <Field
                      as={FormTextInput}
                      name="ticketTitle"
                      type="text"
                      label="Ticket Title"
                    />
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Provide details about the Ticket objective"
                    title="Ticket Description"
                    isRequired
                  >
                    <Field
                      as={FormTextAreaInput}
                      name="issueDescription"
                      type="text"
                      label="Description"
                      placeholder="Description"
                      customStyle={{ height: '133px' }}
                    />
                  </FormInputWrapper>

                  {!asset && (
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="24px"
                      description="Select the Asset to which this ticket relates to"
                      title="Asset"
                      isRequired
                    >
                      <AssetSelect selectName="assetId" selectTitle="Asset" />
                    </FormInputWrapper>
                  )}

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Choose the category this ticket belongs to"
                    title="Type"
                    isRequired
                  >
                    <TicketTypeSelect
                      selectName="ticketTypeId"
                      selectTitle="Ticket Type"
                    />
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Set the urgency level for this ticket"
                    title="Priority"
                    isRequired
                  >
                    <VStack width="full" spacing="4px" alignItems="flex-start">
                      <SelectableButtonGroup
                        isMultiSelect={false}
                        buttonVariant="secondary"
                        customButtonStyle={{ width: 'max-content' }}
                        options={ticketPriorityOptions}
                        selectedOptions={[
                          getSelectedOption(
                            ticketPriorityOptions,
                            formik.values.ticketPriorityId!
                          ),
                        ]}
                        handleSelect={(options) => {
                          formik.setFieldValue(
                            'ticketPriorityId',
                            options[0]?.value
                          );
                        }}
                      />

                      {formik.submitCount > 0 &&
                        formik.errors.ticketPriorityId && (
                          <ErrorMessage>
                            {formik.errors.ticketPriorityId}
                          </ErrorMessage>
                        )}
                    </VStack>
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Name of user that initiated the ticket"
                    title="Ticket Raised By"
                  >
                    <UserDisplayAndAddButton
                      selectedUser={formik.values.reportedByEmployeeName}
                      handleSelectUser={(user) => {
                        formik.setFieldValue(
                          'reportedByEmployeeId',
                          user?.value ?? null
                        );

                        formik.setFieldValue(
                          'reportedByEmployeeName',
                          user?.label ?? null
                        );
                      }}
                      sectionInfoTitle="Raised By"
                    />
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Name of user that the ticket is assigned to"
                    title="Ticket Assigned To"
                  >
                    <UserDisplayAndAddButton
                      selectedUser={formik.values.assignedToEmployeeName}
                      handleSelectUser={(user) => {
                        formik.setFieldValue('assignedTo', user?.value ?? null);

                        formik.setFieldValue(
                          'assignedToEmployeeName',
                          user?.label ?? null
                        );
                      }}
                      sectionInfoTitle="Assigned To"
                    />
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="24px"
                    description="Specify the date when this ticket was raised"
                    title="Request Date"
                    alignItems={{ lg: 'center' }}
                  >
                    <Text fontSize={'14px'} color="gray">
                      {dateFormatter(new Date(), `DD / MM / YYYY`)}
                    </Text>
                  </FormInputWrapper>
                </VStack>
              </form>
            </Flex>
          </DrawerBody>

          <DrawerFooter p={0} m={0}>
            <HStack
              width="full"
              spacing="8px"
              justifyContent={{ base: 'center', lg: 'flex-end' }}
              mt="8px"
              px="24px"
              pb="32px"
            >
              <Button
                customStyles={{ width: '138px', height: '50px' }}
                variant="secondary"
                handleClick={onClose}
              >
                Cancel
              </Button>

              <Button
                isLoading={isCreatingTicket}
                handleClick={() => {
                  formik.handleSubmit();
                }}
                customStyles={{
                  width: { base: '161px', lg: '237px' },
                  height: '50px',
                }}
              >
                Save Ticket
              </Button>
            </HStack>
          </DrawerFooter>
        </FormikProvider>
      </GenericDrawer>

      <CreateTicketSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess();
          onClose();
        }}
      />
    </>
  );
};

export default CreateTicketDrawer;
