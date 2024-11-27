import { HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
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

interface TicketDrawerBodySubSectionProps {
  data: Ticket;
  category: TicketCategory;
  action: SelectedTicketAction;
}

const TicketDrawerBodySubSection = (props: TicketDrawerBodySubSectionProps) => {
  const { data, category, action } = props;

  const AvatarSize = {
    width: category === 'new' ? '42px' : '24px',
    height: category === 'new' ? '42px' : '24px',
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formikContext = useFormikContext<any>();

  return (
    <VStack width="full" alignItems="flex-start" spacing="32px" py="24px">
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

        <VStack spacing="8px" alignItems="center">
          <Text fontWeight={700} color="neutral.600">
            {category === 'new' ? 'Requested Date' : 'First Respond Date'}
          </Text>

          <Text>
            {dateFormatter(
              category === 'new' ? data?.issueReportDate : data?.resolutionDate,
              'DD/MM/YYYY'
            ) ?? 'N/A'}
          </Text>
        </VStack>
      </HStack>

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
    </VStack>
  );
};

export default TicketDrawerBodySubSection;
