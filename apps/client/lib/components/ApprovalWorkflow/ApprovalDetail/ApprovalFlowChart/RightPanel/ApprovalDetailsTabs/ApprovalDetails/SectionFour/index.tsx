import {
  Box,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import UserDetail from '~/lib/components/UserManagement/UserDetail';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { useAppSelector } from '~/lib/redux/hooks';
import { SYSTEM_CONTEXT_DETAILS } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

const SectionFour = () => {
  const approvalRequest = useAppSelector(
    (state) => state.approval.approvalRequest
  );
  const {
    isOpen: isOpenUser,
    onClose: onCloseUser,
    onOpen: onOpenUser,
  } = useDisclosure();
  const { updateSearchParam, removeSearchParam } = useCustomSearchParams();
  return (
    <>
      <VStack alignItems="flex-start" gap="1.2em">
        <Box
          display="grid"
          gridTemplateColumns="90px 1fr"
          columnGap="2.5em"
          width="100%"
        >
          <Text color="neutral.600" size="md">
            Requested By
          </Text>
          <UserInfo
            name={`${approvalRequest?.requestedByUserFirstName} ${approvalRequest?.requestedByUserLastName}`}
            textStyle={{
              color: '#0366EF',
              size: 'md',
              cursor: 'pointer',
              onClick: () => {
                if (approvalRequest?.requestedByUserId) {
                  onOpenUser();
                }
              },
            }}
            customAvatarStyle={{
              width: '24px',
              height: '24px',
            }}
          />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="90px 1fr"
          columnGap="2.5em"
          width="100%"
        >
          <Text color="neutral.600" size="md">
            Date
          </Text>

          <HStack alignItems="center" gap="8px">
            <Icon as={CalendarIcon} />

            <Text color="neutral.800" size="md">
              {dateFormatter(approvalRequest?.dateRequested, 'MMMM DD, YYYY')}
            </Text>
          </HStack>
        </Box>
      </VStack>
      {isOpenUser && (
        <UserDetail
          isOpen={isOpenUser}
          onClose={() => {
            onCloseUser();
          }}
          defaultUserId={approvalRequest?.requestedByUserId}
          showHeader={false}
        />
      )}
    </>
  );
};

export default SectionFour;
