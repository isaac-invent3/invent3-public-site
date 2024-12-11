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
import { BackButton, Button } from '@repo/ui/components';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';
import TicketDrawerBodyHeader from './TicketDrawerBodyHeader';
import TicketDrawerBodySubSection from './TicketDrawerBodySubSection';
import TicketDrawerHeader from './TicketDrawerHeader';

interface TicketDrawerPropsBase<T = any> {
  isOpen: boolean;
  onClose: () => void;
  data: Ticket;
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
            {action === 'edit' && (
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

            <TicketDrawerBodyHeader action={action} data={data} />

            <VStack px="24px" width="full">
              <TicketDrawerBodySubSection
                action={action}
                data={data}
                category={category}
              />

              {children}
            </VStack>
          </Flex>
        </DrawerBody>

        {drawerFooter && (
          <DrawerFooter p={0} m={0}>
            {drawerFooter}
          </DrawerFooter>
        )}
      </>
    );
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="507px">
        <DrawerHeader p={0} m={0}>
          <HStack
            pt="16px"
            pb="32px"
            px="24px"
            width="full"
            justifyContent="space-between"
          >
            <BackButton handleClick={onClose} />

            <TicketDrawerHeader action={action} data={data} category={category}>
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
          </HStack>
        </DrawerHeader>

        {props?.formik && (
          <FormikProvider value={props.formik}>
            {renderDrawerContent()}
          </FormikProvider>
        )}

        {!props?.formik && renderDrawerContent()}
      </GenericDrawer>
    </>
  );
};

export default TicketDrawerWrapper;
