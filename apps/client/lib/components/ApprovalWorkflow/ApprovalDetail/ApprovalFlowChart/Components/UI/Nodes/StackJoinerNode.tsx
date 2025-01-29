import { Box, Flex } from '@chakra-ui/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

const StackJoinerNode = ({ isConnectable }: NodeProps<Node>) => {
  return (
    <Flex width="100px" h="200px" alignItems="center" justifyContent="center">
      <Box borderColor="#656565" w="full" borderWidth={0.5}>
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ background: 'transparent', border: 'none' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{ background: 'transparent', border: 'none' }}
          isConnectable={isConnectable}
        />
      </Box>
    </Flex>
  );
};

export default StackJoinerNode;
