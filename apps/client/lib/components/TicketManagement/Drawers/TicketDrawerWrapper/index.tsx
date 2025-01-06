import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
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
        <DrawerBody p={0} m={0}>
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
          >
            {action === 'edit' && ticketDetail && (
              <Heading
                fontSize="32px"
                lineHeight="38.02px"
                color="#0E2642"
                fontWeight={800}
                px="24px"
                pb="16px"
              >
                Edit Ticket
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
      <GenericDrawer isOpen={isOpen} onClose={handleClose} maxWidth="507px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="32px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={handleClose} />

            {ticketDetail && (
              <TicketDrawerHeader
                action={action}
                data={ticketDetail}
                category={ticketCategory}
              >
                {action === 'edit' && (
                  <Button
                    isLoading={props.isEditing}
                    handleClick={props.handleEdit}
                    customStyles={{ width: '107px', height: '35px' }}
                  >
                    Save Changes
                  </Button>
                )}
              </TicketDrawerHeader>
            )}
          </HStack>
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
