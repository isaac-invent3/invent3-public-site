'use client';

import { Flex, Grid, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import {
  Button,
  FormSectionInfo,
  GenericSuccessModal,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ROUTES } from '~/lib/utils/constants';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import { getSelectedTicketIds, removeSelectedTicketIds } from '../utils';
import TicketTable from '../TicketTable';
import {
  useGetTicketsByListOfIdsQuery,
  useUpdateTicketMetadataPayloadMutation,
} from '~/lib/redux/services/ticket.services';
import { updateTicketMetadataSchema } from '~/lib/schemas/ticket.schema';
import DetailHeader from '../../UI/DetailHeader';
import TaskStatusSelect from '../../Common/SelectComponents/TaskStatusSelect';
import TaskPrioritySelect from '../../Common/SelectComponents/TaskPrioritySelect';

const BulkTicketUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const router = useRouter();

  const [updateTicketMetadata, { isLoading }] =
    useUpdateTicketMetadataPayloadMutation({});

  const {
    data,
    isLoading: ticketLoading,
    isFetching,
  } = useGetTicketsByListOfIdsQuery({
    pageSize,
    pageNumber: currentPage,
    ticketIds: getSelectedTicketIds(),
  });

  const formik = useFormik({
    initialValues: {
      ticketStatusId: undefined,
      ticketPriorityId: undefined,
      assignedTo: undefined,
      assignedToEmployeeName: '',
      ticketIds: getSelectedTicketIds(),
    },
    validationSchema: updateTicketMetadataSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      // eslint-disable-next-line no-unused-vars
      const { assignedToEmployeeName, ...payload } = values;

      const formValues = {
        ...payload,
        lastModifiedBy: session?.user.username!,
      };

      const response = await handleSubmit(updateTicketMetadata, formValues, '');

      if (response?.data) {
        resetForm();
        onOpen();
      }
    },
  });

  const submitButtonDisabled = useMemo(() => {
    return (
      getSelectedTicketIds().length < 1 ||
      (!formik.values.ticketPriorityId &&
        !formik.values.ticketStatusId &&
        !formik.values.assignedTo)
    );
  }, [formik]);

  const handleClose = () => {
    removeSelectedTicketIds();
    onClose();
    router.push(`/${ROUTES.TICKETS}`);
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Bulk Ticket Update</PageHeader>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
            <Flex
              width="full"
              py="32px"
              px="25px"
              direction="column"
              gap="50px"
              rounded="6px"
              bgColor="white"
            >
              <HStack width="full" alignItems="flex-start" spacing="16px">
                <Flex width="full" maxW="118px">
                  <FormSectionInfo
                    title="Bulk Tickets"
                    info="List of tickets to be updated."
                    isRequired={false}
                  />
                </Flex>

                <VStack width="full" spacing="27px" overflow="auto">
                  <VStack width="full" spacing="8px" overflow="auto">
                    <TicketTable
                      data={data}
                      isLoading={ticketLoading}
                      isFetching={isFetching}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      pageSize={pageSize}
                      setPageSize={setPageSize}
                      isSelectable={false}
                      showPopover={false}
                    />
                  </VStack>
                </VStack>
              </HStack>

              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(3, 1fr)',
                }}
                gap="32px"
                width="full"
                height="full"
              >
                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    Assign To
                  </DetailHeader>

                  <UserDisplayAndAddButton
                    selectedUser={formik.values?.assignedToEmployeeName}
                    handleSelectUser={(user) => {
                      formik.setFieldValue('assignedTo', user?.value ?? null);
                      formik.setFieldValue(
                        'assignedToEmployeeName',
                        user?.label ?? null
                      );
                    }}
                  />
                </VStack>
                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    New Status
                  </DetailHeader>
                  <TaskStatusSelect
                    selectTitle="Status"
                    selectName="ticketStatusId"
                  />
                </VStack>

                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    New Priority
                  </DetailHeader>
                  <TaskPrioritySelect
                    selectTitle="Priority"
                    selectName="ticketPriorityId"
                  />
                </VStack>
              </Grid>
            </Flex>

            <HStack spacing="16px" justifyContent="flex-end" width="full">
              <Button
                type="button"
                customStyles={{ width: '96px', bgColor: '#F6F6F6B2' }}
                variant="secondary"
                handleClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={formik.isSubmitting || isLoading}
                isDisabled={submitButtonDisabled}
              >
                Bulk Update
              </Button>
            </HStack>
          </Flex>
        </form>
      </FormikProvider>

      {isOpen && (
        <GenericSuccessModal
          isOpen={isOpen}
          onClose={onClose}
          successText="Bulk Ticket Update Successful"
          mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
        >
          <Button
            handleClick={handleClose}
            customStyles={{ width: '193px', mb: '54px' }}
          >
            Continue
          </Button>
        </GenericSuccessModal>
      )}
    </Flex>
  );
};

export default BulkTicketUpdate;
