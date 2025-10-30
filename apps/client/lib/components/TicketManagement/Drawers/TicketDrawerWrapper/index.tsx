import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FormikContextType, FormikProvider } from 'formik';
import {
  BackButton,
  Button,
  GenericDrawer,
  LoadingSpinner,
} from '@repo/ui/components';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';
import TicketDrawerBodyHeader from './TicketDrawerBodyHeader';
import TicketDrawerBodySubSection from './TicketDrawerBodySubSection';
import TicketDrawerHeader from './TicketDrawerHeader';
import { useGetTicketByIdQuery } from '~/lib/redux/services/ticket.services';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import { useEffect, useState } from 'react';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';
import { useAppSelector } from '~/lib/redux/hooks';
import { DrawerAction } from '~/lib/components/UI/DrawerAction';

const getTicketCategory = (data: Ticket) => {
  if (data.isScheduled) {
    return 'scheduled';
  }
  if (data.assignedTo) {
    return 'assigned';
  }
  return 'new';
};

interface TicketDrawerPropsBase<T = any> {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket | null;
  category: TicketCategory;
  action: SelectedTicketAction;
  children?: React.ReactNode;
  drawerFooter?: React.ReactNode;
  formik?: FormikContextType<T>;
}

interface EditTicketDrawerProps extends TicketDrawerPropsBase {
  action: 'edit';
  handleEdit: () => void;
  isEditing?: boolean;
}

type TicketDrawerProps =
  | (TicketDrawerPropsBase & {
      action: Exclude<SelectedTicketAction, 'edit'>;
    })
  | EditTicketDrawerProps;

const TicketDrawerWrapper = (props: TicketDrawerProps) => {
  const { isOpen, onClose, data, action, category, children, drawerFooter } =
    props;
  const { getSearchParam, removeSearchParam } = useCustomSearchParams();
  const ticketSlug = SYSTEM_CONTEXT_DETAILS.TICKETS.slug;
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const completedStatusId =
    typeof appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID === 'string'
      ? +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID
      : appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID;
  const shouldReopenTicket = data?.ticketStatusId === completedStatusId;
  const [ticketCategory, setTicketCategory] = useState(category);
  const ticketId = getSearchParam(ticketSlug)
    ? Number(getSearchParam(ticketSlug))
    : null;
  const [ticketDetail, setTicketDetail] = useState<Ticket | null>(data);
  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketByIdQuery(
    { id: ticketId! },
    { skip: !ticketId || data !== null }
  );

  useEffect(() => {
    if (ticket?.data) {
      setTicketDetail(ticket?.data);
      // Update the ticket category to proper view
      setTicketCategory(getTicketCategory(ticket?.data));
    }
  }, [ticket]);

  const renderDrawerContent = () => {
    return (
      <>
        <DrawerBody p={0} m={0} minH="full">
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
          >
            {action === 'edit' && ticketDetail && (
              <Heading
                size={{ base: 'lg', lg: 'xl' }}
                color="#0E2642"
                fontWeight={800}
                px="24px"
                pb="16px"
              >
                {shouldReopenTicket ? 'Closed Ticket' : 'Edit Ticket'}
              </Heading>
            )}

            {ticketDetail && (
              <TicketDrawerBodyHeader action={action} data={ticketDetail} />
            )}

            {ticketDetail && (
              <VStack px="24px" width="full">
                <TicketDrawerBodySubSection
                  action={action}
                  data={ticketDetail}
                  category={ticketCategory}
                />

                {children}
              </VStack>
            )}
          </Flex>
        </DrawerBody>

        {drawerFooter && ticketDetail && (
          <DrawerFooter p={0} m={0}>
            {drawerFooter}
          </DrawerFooter>
        )}
      </>
    );
  };

  const handleClose = () => {
    removeSearchParam(SYSTEM_CONTEXT_DETAILS.TICKETS.slug);
    onClose();
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="535px">
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

            {ticketDetail && (
              <TicketDrawerHeader
                action={action}
                data={ticketDetail}
                category={ticketCategory}
              >
                {action === 'edit' && !shouldReopenTicket && (
                  <Button
                    isLoading={props.isEditing}
                    handleClick={props.handleEdit}
                    customStyles={{ width: '107px', height: '35px' }}
                  >
                    {shouldReopenTicket ? 'Re-open Ticket' : 'Save Changes'}
                  </Button>
                )}
                {action === 'edit' && shouldReopenTicket && (
                  <DrawerAction>
                    <Text
                      cursor="pointer"
                      as="button"
                      onClick={() => props.handleEdit()}
                      whiteSpace="nowrap"
                    >
                      Re-open Ticket
                    </Text>
                  </DrawerAction>
                )}
              </TicketDrawerHeader>
            )}
          </Stack>
        </DrawerHeader>
        {isLoading && (
          <DrawerBody width="full" height="full">
            <LoadingSpinner />
          </DrawerBody>
        )}
        {ticketDetail && !isLoading && (
          <Flex direction="column" width="full">
            {props?.formik && (
              <FormikProvider value={props.formik}>
                {renderDrawerContent()}
              </FormikProvider>
            )}
            {!props?.formik && renderDrawerContent()}
          </Flex>
        )}

        {!isLoading && isError && (
          <DrawerBody width="full" height="full">
            <GenericErrorState subtitle="Invalid Ticket" />
          </DrawerBody>
        )}
      </GenericDrawer>
    </>
  );
};

export default TicketDrawerWrapper;
