import {
  Box,
  Card,
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

type ApprovalNodeProps = {
  status: string;
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

  const handleStyle = { left: 10 };

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
          <Box
            padding="6px"
            color="#A07905"
            borderWidth="1px"
            borderColor="#EABC3080"
            background="#EABC300D"
            width="max-content"
            rounded="6px"
            minWidth="90px"
          >
            <Text color="#A07905">{status}</Text>
          </Box>

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
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="input"
        isConnectable={isConnectable}
      />
    </Card>
  );
};

export default ApprovalNode;
