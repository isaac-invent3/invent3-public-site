import { Box, Card, StackDivider, VStack } from '@chakra-ui/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { CustomNodeData } from '../../Interfaces';
import Action from './Sections/Action';
import Approval from './Sections/Approval';

const ApprovalNode = ({
  data,
  isConnectable,
  id,
}: NodeProps<Node<CustomNodeData>>) => {
  const { actionId, approveeId } = data;

  return (
    <Card
      rounded="8px"
      p="16px"
      background={actionId ? 'white' : '#e7f6fe'}
      overflowY="scroll"
      w="185px"
      transition="all 300ms ease-in-out"
    >
      <VStack
        alignItems="start"
        gap={!actionId || !approveeId ? '16px' : '0px'}
        divider={
          actionId && approveeId ? (
            <StackDivider
              height="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="none"
            >
              <Box borderColor="#838383" width="full" borderWidth={0.5}></Box>
            </StackDivider>
          ) : undefined
        }
      >
        <Action nodeId={id} data={data} />
        <Approval nodeId={id} data={data} />
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
