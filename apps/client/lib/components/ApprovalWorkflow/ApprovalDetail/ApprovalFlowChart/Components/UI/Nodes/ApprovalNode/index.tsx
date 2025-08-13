import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { useRef, useState } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import {
  CursorIcon,
  CalendarIcon,
  ThreeVerticalDotsIcon,
} from '~/lib/components/CustomIcons';
import { CustomNode } from '../../../Interfaces';
import PopoverAction from './PopoverAction';
import UserDetail from '~/lib/components/UserManagement/UserDetail';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { setOpenPopoverId } from '~/lib/redux/slices/ApprovalSlice';
import { APPROVAL_ACTION } from '~/lib/utils/constants';

const ApprovalNode = ({ data, isConnectable, id }: NodeProps<CustomNode>) => {
  const { approvalActionId, userId } = data;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenUser,
    onClose: onCloseUser,
    onOpen: onOpenUser,
  } = useDisclosure();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const openPopoverId = useAppSelector((state) => state.approval.openPopoverId);

  const isPopoverOpen = openPopoverId === id;

  const togglePopover = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent pane click from firing
    dispatch(setOpenPopoverId(isPopoverOpen ? null : id));
  };

  return (
    <>
      <Box position="relative" zIndex={1} ref={wrapperRef}>
        <Card
          rounded="8px"
          p="16px"
          background={approvalActionId ? 'white' : '#e7f6fe'}
          overflowY="scroll"
          w="185px"
          minH="183px"
          transition="all 300ms ease-in-out"
          zIndex={1}
          sx={{
            scrollbarWidth: '0px',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              width: '0px',
              height: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
          }}
        >
          <VStack
            alignItems="start"
            gap={!approvalActionId || !userId ? '16px' : '0px'}
          >
            <VStack
              alignItems="flex-start"
              gap="8px"
              w="full"
              position="relative"
            >
              <Flex
                w="full"
                justifyContent="flex-end"
                position="absolute"
                display={
                  data?.approvalActionId ===
                  APPROVAL_ACTION.REQUESTED_THE_APPROVAL
                    ? 'none'
                    : 'flex'
                }
              >
                <Icon
                  as={ThreeVerticalDotsIcon}
                  boxSize="16px"
                  cursor="pointer"
                  color="neutral.700"
                  position="relative"
                  zIndex={999}
                  onClick={togglePopover}
                />
              </Flex>
              {data?.currentStatusId === 3 && (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="24px"
                  h="24px"
                  rounded="full"
                  background="#07CC3B26"
                >
                  <Icon as={CheckIcon} color="#018A1E" boxSize="14px" />
                </Flex>
              )}

              {data?.currentStatusId !== 3 && (
                <Box
                  padding="6px"
                  borderWidth="1px"
                  borderColor={`${data?.displayColorCode}80`}
                  bgColor={`${data?.displayColorCode}0D`}
                  width="max-content"
                  rounded="6px"
                  minWidth="90px"
                >
                  <Text color={data?.displayColorCode}>
                    {data?.currentStatusName}
                  </Text>
                </Box>
              )}

              <Text size="md" color="primary.500" fontWeight={700}>
                {data?.requiredAction}
              </Text>

              <HStack alignItems="center" gap="8px">
                <Icon as={CursorIcon} boxSize="14px" color="neutral.600" />

                <Text color="neutral.600">{data?.employeeDesignation}</Text>
              </HStack>
            </VStack>

            <VStack
              alignItems="flex-start"
              gap="8px"
              w="full"
              mt="16px"
              borderTop="1px solid rgba(131, 131, 131, 0.5)"
              pt="16px"
            >
              <UserInfo
                name={`${data?.firstName} ${data?.lastName}`}
                textStyle={{
                  size: 'base',
                  color: '#0366EF',
                  cursor: 'pointer',
                  transition: 'all 200ms ease-in-out',
                  textDecoration: 'underline',
                  _hover: {
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    if (data?.userId) {
                      setSelectedUserId(data.userId);
                      onOpenUser();
                    }
                  },
                }}
                customAvatarStyle={{
                  width: '24px',
                  height: '24px',
                  size: 'xs',
                }}
                customBoxStyle={{
                  spacing: '8px',
                }}
              />

              <HStack alignItems="center" gap="16px">
                <Icon as={CalendarIcon} boxSize="14px" color="neutral.600" />

                <Text color="neutral.600" isTruncated pl="4px">
                  {'- -'}
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <Handle
            type="source"
            position={Position.Right}
            id="output"
            style={{ background: 'transparent' }}
            isConnectable={isConnectable}
          />

          <Handle
            type="target"
            position={Position.Left}
            id="input"
            style={{ background: 'transparent' }}
            isConnectable={isConnectable}
          />
        </Card>
        <Box
          position="absolute"
          maxW="180px"
          width="180px"
          bgColor="white"
          height="full"
          top={10}
          right={-170}
          zIndex={999}
          rounded="8px"
          display={isPopoverOpen ? 'flex' : 'none'}
        >
          <Flex width="100%" height="100%">
            <PopoverAction nodeId={id} data={data} />
          </Flex>
        </Box>
      </Box>
      {selectedUserId && (
        <UserDetail
          isOpen={isOpenUser}
          onClose={() => {
            setSelectedUserId(null);
            onCloseUser();
          }}
          defaultUserId={selectedUserId || undefined}
        />
      )}
    </>
  );
};

export default ApprovalNode;
