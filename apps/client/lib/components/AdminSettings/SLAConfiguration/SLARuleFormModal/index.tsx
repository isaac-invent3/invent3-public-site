/* eslint-disable no-unused-vars */
import {
  HStack,
  ModalBody,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormSelect,
  GenericModal,
  GenericSuccessModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import TicketTypeSelect from '~/lib/components/TicketManagement/Drawers/Common/TicketTypeSelect';
import TaskPrioritySelect from '~/lib/components/Common/SelectComponents/TaskPrioritySelect';
import { slaSchema } from '~/lib/schemas/sla.schema';
import {
  useCreateSLADefintionMutation,
  useUpdateSLADefintionMutation,
} from '~/lib/redux/services/settings/sla.services';
import { SLADefinition } from '~/lib/interfaces/sla.interfaces';

const DURATION_OPTIONS = [
  { label: '4 hours', hours: 4 },
  { label: '8 hours', hours: 8 },
  { label: '24 hours', hours: 24 },
  { label: '48 hours', hours: 48 },
];

export const options = DURATION_OPTIONS.map((item, index) => ({
  label: item.label,
  value: item.hours,
}));

interface SLARuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'create' | 'edit';
  data?: SLADefinition;
}
const SLARuleFormModal = (props: SLARuleFormModalProps) => {
  const { isOpen, onClose, type, data } = props;
  const {
    isOpen: isOpenSuccess,
    onClose: onCloseSucces,
    onOpen: onOpenSuccess,
  } = useDisclosure();
  const [createSLADefinition, { isLoading }] = useCreateSLADefintionMutation(
    {}
  );
  const [updateSLADefinition, { isLoading: isUpdating }] =
    useUpdateSLADefintionMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      ticketTypeId: data?.ticketTypeId ?? null,
      priorityId: data?.priorityId ?? null,
      slaDurationMinutes: data?.slaDurationMinutes ?? null,
      slaResponseHours: data?.slaResponseHours ?? null,
      slaReminderHours: data?.slaReminderHours ?? null,
      enableReminders: data?.enableReminders ?? false,
      isActive: data?.isActive ?? true,
    },
    validationSchema: slaSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      let response;
      let finalValue: any = { ...values };
      if (type === 'create') {
        finalValue.createdBy = session?.user?.username || '';
        response = await handleSubmit(createSLADefinition, finalValue);
      } else {
        finalValue.lastModifiedBy = session?.user?.username || '';
        response = await handleSubmit(updateSLADefinition, finalValue);
      }
      if (response?.data) {
        onOpenSuccess();
        resetForm();
      }
    },
  });

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { sm: '525px' }, rounded: '16px' }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                spacing="32px"
                py={{ base: '24px' }}
                px={{ base: '20px', md: '24px' }}
                alignItems="flex-end"
              >
                <ModalHeading
                  heading={`${type === 'create' ? 'Add' : 'Edit'} SLA Rule`}
                  subheading="Set up SLA rules to ensure ticket deadlines are met"
                />

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="40px">
                  <VStack spacing="16px" width="full" alignItems="flex-start">
                    <Text fontWeight={700} size="lg" lineHeight="100%">
                      Define Rule Scope
                    </Text>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="Ticket of different maintenance type"
                      title="Ticket Type"
                      isRequired
                    >
                      <TicketTypeSelect
                        selectName="ticketTypeId"
                        selectTitle="Ticket Type"
                        selectStyles={{
                          backgroundColor: formik.errors.ticketTypeId
                            ? '#FFDCDC'
                            : '#E6E6E6',
                        }}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="Priority Level"
                      isRequired
                    >
                      <TaskPrioritySelect
                        selectName="priorityId"
                        selectTitle="Priority"
                        selectStyles={{
                          backgroundColor: formik.errors.priorityId
                            ? '#FFDCDC'
                            : '#E6E6E6',
                        }}
                      />
                    </FormInputWrapper>
                  </VStack>

                  <VStack spacing="16px" width="full" alignItems="flex-start">
                    <Text fontWeight={700} size="lg" lineHeight="100%">
                      Set SLA Timelines
                    </Text>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="Response Time"
                      isRequired
                    >
                      <FormSelect
                        name="slaResponseHours"
                        title="Duration"
                        options={options.map((item, index) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                        selectStyles={{
                          height: '46px',
                          pt: '0px',
                          backgroundColor: formik.errors.slaReminderHours
                            ? '#FFDCDC'
                            : '#E6E6E6',
                        }}
                        showTitleAfterSelect={true}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="Resolution Time"
                      isRequired
                    >
                      <FormSelect
                        name="slaReminderHours"
                        title="Duration"
                        options={options.map((item, index) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                        selectStyles={{
                          height: '46px',
                          pt: '0px',
                          backgroundColor: formik.errors.slaReminderHours
                            ? '#FFDCDC'
                            : '#E6E6E6',
                        }}
                        showTitleAfterSelect={true}
                      />
                    </FormInputWrapper>
                  </VStack>

                  <VStack spacing="16px" width="full" alignItems="flex-start">
                    <Text fontWeight={700} size="lg" lineHeight="100%">
                      Additional Options
                    </Text>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="Send reminders before SLA breach"
                      isRequired={false}
                      justifyContent="space-between"
                    >
                      <Switch
                        size="sm"
                        isChecked={formik.values.enableReminders}
                        onChange={() =>
                          formik.setFieldValue(
                            'enableReminders',
                            !formik.values.enableReminders
                          )
                        }
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="Reminder Interval"
                      isRequired={false}
                    >
                      <FormSelect
                        name="slaDurationMinutes"
                        title="Duration"
                        options={options.map((item, index) => ({
                          label: item.label,
                          value: item.value,
                        }))}
                        selectStyles={{
                          height: '46px',
                          pt: '0px',
                          backgroundColor: '#E6E6E6',
                        }}
                        showTitleAfterSelect={true}
                      />
                    </FormInputWrapper>
                    <FormInputWrapper
                      sectionMaxWidth="128px"
                      customSpacing="24px"
                      description="How urgent should we approach the rule"
                      title="SLA Active"
                      isRequired={false}
                      justifyContent="space-between"
                    >
                      <Switch
                        size="sm"
                        isChecked={formik.values.isActive}
                        onChange={() =>
                          formik.setFieldValue(
                            'isActive',
                            !formik.values.isActive
                          )
                        }
                      />
                    </FormInputWrapper>
                  </VStack>
                </VStack>
                {/* Main Form Ends Here */}
                <HStack spacing="14px">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '96px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    customStyles={{ width: '157px' }}
                    isLoading={isLoading || formik.isSubmitting || isUpdating}
                  >
                    Save Rule
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormikProvider>
        </ModalBody>
      </GenericModal>
      <GenericSuccessModal
        successText={`You have ${type === 'create' ? 'added' : 'updated'} a new SLA rule successfully`}
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSucces();
          onClose();
        }}
      >
        <Button
          customStyles={{ width: '193px' }}
          handleClick={() => {
            onCloseSucces();
            onClose();
          }}
        >
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default SLARuleFormModal;
