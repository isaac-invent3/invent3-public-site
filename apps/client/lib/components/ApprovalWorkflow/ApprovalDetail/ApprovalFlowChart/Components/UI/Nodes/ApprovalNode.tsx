import {
  Box,
  Card,
  Menu,
  MenuItem,
  MenuList,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { useCallback } from 'react';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import Action from './Sections/Action';
import Approval from './Sections/Approval';

const ApprovalNode = ({
  data,
  isConnectable,
  id,
}: NodeProps<Node<ApprovalWorkflowPartyInstance>>) => {
  const { approvalActionId, userId } = data;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();

    onOpen();

    const menu = document.querySelector('[role=menu]');

    const popper = menu?.parentElement;

    const x = event.clientX;
    const y = event.clientY;

    Object.assign(popper?.style, {
      inset:'none',
      bottom: `${y}px`,
      right: `${x}px`,
    });
  }, []);

  return (
    <Card
      rounded="8px"
      p="16px"
      background={approvalActionId ? 'white' : '#e7f6fe'}
      overflowY="scroll"
      w="185px"
      transition="all 300ms ease-in-out"
      onContextMenu={handleContextMenu}
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

      <Menu isOpen={isOpen} onClose={onClose}>
        <MenuList>
          <MenuItem>
            <Text cursor="pointer" as="a">
              Edit
            </Text>
          </MenuItem>
          <MenuItem>
            <Text cursor="pointer" as="a">
              Create a Copy
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
};

export default ApprovalNode;
