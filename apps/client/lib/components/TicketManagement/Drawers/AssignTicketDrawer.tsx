import { HStack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useUpdateTicketMutation } from '~/lib/redux/services/ticket.services';
import { assignTicketSchema } from '~/lib/schemas/ticket.schema';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import Button from '../../UI/Button';
import ErrorMessage from '../../UI/ErrorMessage';
import FormInputWrapper from '../../UI/Form/FormInputWrapper';
import TicketDrawerWrapper from './TicketDrawerWrapper';

interface AssignTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
}

export interface AssignTicketForm {
  assignedTo: number | null;
  assignedToEmployeeName: string | null;
}

const AssignTicketDrawer = (props: AssignTicketDrawerProps) => {
  const { isOpen, onClose, data } = props;

  const [updateTicketMutation, { isLoading: isUpdatingTicket }] =
    useUpdateTicketMutation();

  const { data: session } = useSession();

  const toast = useToast();

  const username = session?.user?.username;

  const formik = useFormik<AssignTicketForm>({
    initialValues: {
      assignedTo: null,
      assignedToEmployeeName: null,
    },
    validationSchema: assignTicketSchema,
    enableReinitialize: true,
    onSubmit: async (payload) => {
      const response = await updateTicketMutation({
        id: data.ticketId,
        ticketId: data.ticketId,
        assignedTo: payload.assignedTo,
        lastModifiedBy: username,
      });

      if (response) {
        toast({
          title: 'Ticket Was Assigned Successfully',
          status: 'success',
          position: 'top-right',
        });

        onClose();
      }
    },
  });

  const AssignDrawerFooter = () => {
    return (
      <HStack
        spacing="8px"
        justifyContent="flex-end"
        mt="8px"
        px="24px"
        pb="32px"
      >
        <Button
          customStyles={{ width: '84px', height: '35px' }}
          variant="secondary"
          handleClick={onClose}
        >
          Cancel
        </Button>

        <Button
          isLoading={isUpdatingTicket}
          handleClick={() => formik.handleSubmit()}
          customStyles={{ width: '126px', height: '35px' }}
        >
          Assign Ticket
        </Button>
      </HStack>
    );
  };

  return (
    <TicketDrawerWrapper
      data={data}
      category={'new'}
      action="assign"
      isOpen={isOpen}
      formik={formik}
      onClose={onClose}
      drawerFooter={<AssignDrawerFooter />}
    >
      <FormInputWrapper
        sectionMaxWidth="141px"
        spacing="24px"
        pb="16px"
        description="Add name that users can likely search with"
        title="Assigned To"
        isRequired
      >
        <UserDisplayAndAddButton
          selectedUser={formik.values.assignedToEmployeeName}
          handleSelectUser={(user) => {
            formik.setFieldValue('assignedTo', user?.value ?? null);

            formik.setFieldValue('assignedToEmployeeName', user?.label ?? null);
          }}
          sectionInfoTitle="Assigned To"
        />
      </FormInputWrapper>

      {formik.submitCount > 0 &&
        formik.touched &&
        formik.errors.assignedTo !== undefined && (
          <ErrorMessage>{formik.errors.assignedTo}</ErrorMessage>
        )}
    </TicketDrawerWrapper>
  );
};

export default AssignTicketDrawer;
