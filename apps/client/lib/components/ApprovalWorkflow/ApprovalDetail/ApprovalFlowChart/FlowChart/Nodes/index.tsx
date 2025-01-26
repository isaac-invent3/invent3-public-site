import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { CalendarIcon, CursorIcon } from '~/lib/components/CustomIcons';

type ApprovalStatus = 'completed' | 'pending' | 'not-started';

type ApprovalNodeProps = {
  status: ApprovalStatus;
  currentProcess: string;
  role: string;
  approvee: string;
  date?: string;
};

const ApprovalNode = ({
  data,
  isConnectable,
}: NodeProps<Node<ApprovalNodeProps>>) => {
  const { approvee, currentProcess, status, date, role } = data;

  const getStatus = () => {
    switch (status) {
      case 'pending':
        return {
          borderColor: '#EABC3080',
          backgroundColor: '#EABC300D',
          textColor: '#A07905',
          displayName: 'In Progress',
        };

      case 'not-started':
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
    <Card
      rounded="8px"
      padding="16px"
      background="white"
      overflowY="scroll"
      w="185px"
    >
      <VStack
        divider={
          <StackDivider
            height="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="none"
          >
            <Box borderColor="#838383" width="full" borderWidth={0.5}></Box>
          </StackDivider>
        }
      >
        <VStack alignItems="flex-start" gap="12px" w="full">
          {status === 'completed' && (
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

          {status !== 'completed' && (
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
            {currentProcess}
          </Text>

          <HStack alignItems="center" gap="16px">
            <Icon as={CursorIcon} />

            <Text color="neutral.600">{role}</Text>
          </HStack>
        </VStack>

        <VStack alignItems="flex-start" gap="12px" w="full">
          <UserInfo
            name={approvee}
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
              {date ?? '- -'}
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
  );
};

export default ApprovalNode;
