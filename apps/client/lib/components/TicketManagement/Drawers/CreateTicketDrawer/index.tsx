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
import { Field, FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import AssetSelect from '~/lib/components/Common/AssetSelect';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import Button from '~/lib/components/UI/Button';
import BackButton from '~/lib/components/UI/Button/BackButton';
import SelectableButtonGroup from '~/lib/components/UI/Button/SelectableButtonGroup';
import ErrorMessage from '~/lib/components/UI/ErrorMessage';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import TextareaInput from '~/lib/components/UI/TextArea';
import TextInput from '~/lib/components/UI/TextInput';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useCreateTicketMutation } from '~/lib/redux/services/ticket.services';
import { createTicketSchema } from '~/lib/schemas/ticket.schema';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateOptions } from '~/lib/utils/helperFunctions';
import FormInputWrapper from '../../../UI/Form/FormInputWrapper';
import CreateTicketSuccessModal from '../../Modals/CreateTicketSuccessModal';
import TicketTypeSelect from '../Common/TicketTypeSelect';

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

  const { data: session } = useSession();

  const username = session?.user?.username;

  const { handleSubmit } = useCustomMutation();

  const { data: ticketPriorities } = useGetAllTaskPrioritiesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: 1,
  });

  const [createTicketMutation, { isLoading: isCreatingTicket }] =
    useCreateTicketMutation();

  const initialValues = {
    ticketTitle: null,
    issueDescription: null,
    assetId: asset?.assetId ?? null,
    reportedByEmployeeId: null,
    reportedByEmployeeName: null,
    ticketTypeId: null,
    ticketPriorityId: null,
    issueReportDate: moment(new Date().toISOString()).utcOffset(0, true),
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: false,
    validationSchema: createTicketSchema,
    onSubmit: async (data) => {
      const successMessage = asset
        ? `Ticket for ${asset.assetName} Created Successfully`
        : 'Ticket Created Successfully';
      const response = await handleSubmit(
        createTicketMutation,
        {
          ...data,
          createdBy: username,
        },
        successMessage
      );

      if (response?.data) {
        formik.resetForm();
        onOpenSuccess();
      }
    },
  });

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
                fontSize="32px"
                lineHeight="38.02px"
                color="black"
                px="24px"
                pb="20px"
                fontWeight={800}
              >
                Add New Ticket
              </Heading>

              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <VStack width="full" spacing="24px" px="24px" mt="22px">
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Add name that users can likely search with"
                    title="Ticket Title"
                    isRequired
                  >
                    <Field
                      as={TextInput}
                      name="ticketTitle"
                      type="text"
                      label="Ticket Title"
                    />
                  </FormInputWrapper>

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Ticket Description"
                    isRequired
                  >
                    <Field
                      as={TextareaInput}
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
                      spacing="24px"
                      description="Choose the category and the sub-category"
                      title="Ticket Asset"
                      isRequired
                    >
                      <AssetSelect selectName="assetId" selectTitle="Asset" />
                    </FormInputWrapper>
                  )}

                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    spacing="24px"
                    description="Choose the category and the sub-category"
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
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Priority"
                    isRequired
                  >
                    <VStack width="full" spacing="4px" alignItems="flex-start">
                      <SelectableButtonGroup
                        isMultiSelect={false}
                        buttonVariant="secondary"
                        customButtonStyle={{ width: 'max-content' }}
                        options={generateOptions(
                          ticketPriorities?.data.items,
                          'priority',
                          'taskPriorityId'
                        )}
                        selectedOptions={[
                          {
                            value: formik.values.ticketPriorityId!,
                            label: formik.values.ticketPriorityId!,
                          },
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
                    spacing="24px"
                    description="Add name that users can likely search with"
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
                    spacing="24px"
                    description="Choose the category and the sub-category"
                    title="Request Date"
                    isRequired
                    alignItems="center"
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
              spacing="8px"
              justifyContent="flex-end"
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
                customStyles={{ width: '237px', height: '50px' }}
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
