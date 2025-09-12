import {
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import UserSelectModal from '~/lib/components/Common/Modals/UserSelectModal';
import UserInfo from '~/lib/components/Common/UserInfo';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import Description from '../Common/Description';
import ViewAttachement from '~/lib/components/Common/AttachFileAndView/ViewAttachement';
import { useGetTicketDocumentsByIdQuery } from '~/lib/redux/services/ticket.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import SourceAlert from './SourceAlert';

interface TicketDrawerBodySubSectionProps {
  data: Ticket;
  category: TicketCategory;
  action: SelectedTicketAction;
}

export interface AssignedToFormDetails {
  assignedToEmployeeName: string | null;
  assignedTo: number | null;
}

const TicketDrawerBodySubSection = (props: TicketDrawerBodySubSectionProps) => {
  const { data, category, action } = props;
  const { data: ticketDocuments, isLoading } = useGetTicketDocumentsByIdQuery(
    { ticketId: data.ticketId, pageNumber: 1, pageSize: DEFAULT_PAGE_SIZE },
    { skip: !data?.ticketId }
  );

  const AvatarSize = {
    width: category === 'new' ? '42px' : '24px',
    height: category === 'new' ? '42px' : '24px',
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formikContext = useFormikContext<AssignedToFormDetails>();

  return (
    <VStack width="full" alignItems="flex-start" spacing="32px" py="24px">
      <SourceAlert />
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing="40px"
      >
        <VStack spacing="8px" alignItems="flex-start">
          <Text fontWeight={700} color="neutral.600">
            Requested by
          </Text>

          <UserInfo name={data?.reportedBy} customAvatarStyle={AvatarSize} />
        </VStack>

        {category !== 'new' && (
          <VStack spacing="8px" alignItems="flex-start">
            <Text fontWeight={700} color="neutral.600">
              Assigned to
            </Text>

            <UserInfo
              name={formikContext?.values?.assignedToEmployeeName}
              customAvatarStyle={AvatarSize}
              customBoxStyle={{ alignItems: 'center' }}
            >
              {(action === 'edit' || action === 'schedule') && (
                <Text
                  fontWeight={500}
                  fontSize="10px"
                  lineHeight="11.88px"
                  color="#0366EF"
                  mt="4px"
                  cursor="pointer"
                  onClick={onOpen}
                >
                  Reassign Ticket
                </Text>
              )}
            </UserInfo>
          </VStack>
        )}

        {(category === 'new' || category === 'completed') && (
          <VStack spacing="8px" alignItems="center">
            <Text fontWeight={700} color="neutral.600">
              {category === 'new' ? 'Requested Date' : 'Resolution Date'}
            </Text>

            <Text>
              {dateFormatter(
                category === 'new'
                  ? data?.issueReportDate
                  : data?.resolutionDate,
                'DD/MM/YYYY'
              ) ?? 'N/A'}
            </Text>
          </VStack>
        )}
      </HStack>

      <SimpleGrid
        width="full"
        spacing={{ base: '24px', md: '40px' }}
        columns={{ base: 1 }}
      >
        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Asset Name
          </Text>
          <VStack alignItems="flex-start">
            {data?.assetCode && (
              <Text color="neutral.600" size="md">
                ({data?.assetCode})
              </Text>
            )}
            <Text color="black" size="md">
              {data?.assetName ?? 'N/A'}
            </Text>
          </VStack>
        </VStack>

        <VStack width="full" spacing="8px" alignItems="flex-start">
          <Text color="neutral.600" fontWeight={700}>
            Asset Location
          </Text>
          <Text color="black" size="md">
            {data?.assetLocation ?? 'N/A'}
          </Text>
        </VStack>
      </SimpleGrid>

      <Description info={data?.issueDescription} />
      <UserSelectModal
        isOpen={isOpen}
        onClose={onClose}
        handleSelectUser={(user) => {
          formikContext?.setFieldValue('assignedTo', user?.value ?? null);

          formikContext?.setFieldValue(
            'assignedToEmployeeName',
            user?.label ?? null
          );
        }}
      />
      {isLoading && <Skeleton width="full" height="100px" />}
      {ticketDocuments?.data && ticketDocuments?.data?.items.length > 0 && (
        <ViewAttachement
          attachement={{
            documentId: ticketDocuments?.data?.items[0]?.documentId!,
            documentName: ticketDocuments?.data?.items[0]?.documentName!,
            base64Document: ticketDocuments?.data?.items[0]?.document!,
            base64Prefix: ticketDocuments?.data?.items[0]?.base64Prefix!,
          }}
          handleRemoveDocument={() => {}}
        />
      )}
    </VStack>
  );
};

export default TicketDrawerBodySubSection;
