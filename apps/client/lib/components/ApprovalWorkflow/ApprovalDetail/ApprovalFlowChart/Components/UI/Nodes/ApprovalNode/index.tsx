import { CalendarIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { useEffect, useRef } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { CursorIcon } from '~/lib/components/CustomIcons';
import { CustomNode } from '../../../Interfaces';
import PopoverAction from './PopoverAction';

const ApprovalNode = ({ data, isConnectable, id }: NodeProps<CustomNode>) => {
  const { approvalActionId, userId } = data;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    onOpen();
  };

  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as HTMLElement)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const getStatus = () => {
    switch (data?.currentStatusId) {
      case 3:
        return {
          borderColor: '#EABC3080',
          backgroundColor: '#EABC300D',
          textColor: '#A07905',
          displayName: 'In Progress',
        };

      case 1:
        return {
          borderColor: '#65656533',
          backgroundColor: '#6565651A',
          textColor: '#838383',
          displayName: 'Not Started',
        };

      default:
        return {
          borderColor: '#EABC3080',
          backgroundColor: '#EABC300D',
          textColor: '#A07905',
          displayName: 'Invalid Status',
        };
    }
  };

  const statusStyles = getStatus();

  return (
    <Box ref={popoverRef} position="relative" zIndex={1}>
      <Popover
        placement="right-start"
        autoFocus={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Card
            rounded="8px"
            p="16px"
            background={approvalActionId ? 'white' : '#e7f6fe'}
            overflowY="scroll"
            w="185px"
            h="210px"
            transition="all 300ms ease-in-out"
            onContextMenu={handleContextMenu}
            zIndex={1}
          >
            <VStack
              alignItems="start"
              gap={!approvalActionId || !userId ? '16px' : '0px'}
              divider={
                approvalActionId && userId ? (
                  <StackDivider
                    height="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="none"
                  >
                    <Box
                      borderColor="#838383"
                      width="full"
                      borderWidth={0.5}
                    ></Box>
                  </StackDivider>
                ) : undefined
              }
            >
              <VStack alignItems="flex-start" gap="12px" w="full">
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
                    borderColor={statusStyles.borderColor}
                    background={statusStyles.backgroundColor}
                    width="max-content"
                    rounded="6px"
                    minWidth="90px"
                  >
                    <Text color={statusStyles.textColor}>
                      {statusStyles.displayName}
                    </Text>
                  </Box>
                )}

                <Text size="md" color="primary.500">
                  {data?.requiredAction}
                </Text>

                <HStack alignItems="center" gap="16px">
                  <Icon as={CursorIcon} />

                  <Text color="neutral.600">{data?.employeeDesignation}</Text>
                </HStack>
              </VStack>

              <VStack alignItems="flex-start" gap="12px" w="full">
                <UserInfo
                  name={`${data?.firstName} ${data?.lastName}`}
                  textStyle={{
                    color: '#0366EF',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-in-out',
                    _hover: {
                      textDecoration: 'underline',
                      textUnderlineOffset: 2,
                    },
                  }}
                  customAvatarStyle={{
                    width: '24px',
                    height: '24px',
                  }}
                  customBoxStyle={{
                    spacing: '16px',
                  }}
                />

                <HStack alignItems="center" gap="16px">
                  <Icon as={CalendarIcon} />

                  <Text color="neutral.600" isTruncated>
                    {/* {data.date ?? '- -'} */}
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
        </PopoverTrigger>
        <PopoverContent
          bgColor="white"
          width="150px"
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
          zIndex={999}
          position="relative"
        >
          <PopoverBody m={0} px="8px">
            <PopoverAction nodeId={id} data={data} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ApprovalNode;
