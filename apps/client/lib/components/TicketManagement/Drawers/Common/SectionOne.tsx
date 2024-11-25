import { HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import UserSelectModal from '~/lib/components/Common/Modals/UserSelectModal';
import UserInfo from '~/lib/components/Common/UserInfo';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import Description from './Description';

interface SectionOneProps {
  data: Ticket;
  type: 'new' | 'scheduled';
}

const SectionOne = (props: SectionOneProps) => {
  const { data, type } = props;
  const AvatarSize = {
    width: type === 'new' ? '42px' : '24px',
    height: type === 'new' ? '42px' : '24px',
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [field, meta, helpers] = useField('assignedTo');

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="32px"
      pt="24px"
      px="24px"
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <VStack spacing="8px" alignItems="flex-start">
          <Text fontWeight={700} color="neutral.600">
            Requested by
          </Text>
          <UserInfo name={data?.reportedBy} customAvatarStyle={AvatarSize} />
        </VStack>

        {data.assignedTo && (
          <VStack spacing="8px" alignItems="flex-start">
            <Text fontWeight={700} color="neutral.600">
              Assigned to
            </Text>
            <UserInfo
              name={data?.assignedTo}
              customAvatarStyle={AvatarSize}
              customBoxStyle={{ alignItems: 'flex-start' }}
            >
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
            </UserInfo>
          </VStack>
        )}

        <VStack spacing="8px" alignItems="flex-start">
          <Text fontWeight={700} color="neutral.600">
            {type === 'new' ? 'Requested Date' : 'First Respond Date'}
          </Text>

          <Text>
            {dateFormatter(
              type === 'new' ? data?.issueReportDate : data?.resolutionDate
            ) ?? 'N/A'}
          </Text>
        </VStack>
      </HStack>
      <Description info={data?.issueDescription} />

      <UserSelectModal
        isOpen={isOpen}
        onClose={onClose}
        handleSelectUser={(user) => {
          console.log(user?.value);
        }}
      />
    </VStack>
  );
};

export default SectionOne;
