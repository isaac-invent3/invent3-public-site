import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Card,
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
import type { Node, NodeProps } from '@xyflow/react';
import { addEdge, Handle, Position, useReactFlow } from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { CustomNode } from '../../../Interfaces';
import {
  createNewEdge,
  createNewNode,
} from '../../../Logic/updateApprovalFlowElements';
import Action from './Sections/Action';
import Approval from './Sections/Approval';

const ApprovalNode = ({
  data,
  isConnectable,
  id,
}: NodeProps<Node<ApprovalWorkflowPartyInstance>>) => {
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

  const { getNodes, setNodes, setEdges } = useReactFlow();

  const nodes = getNodes();

  const isPartOfStack = () => {
    const currentNode = nodes.find((item) => item.id == id);

    if (!currentNode) return false;

    const posX = currentNode.position.x;

    const groupedByX: Record<number, CustomNode[]> = {};

    nodes.forEach((n) => {
      if (!groupedByX[n.position.x]) groupedByX[n.position.x] = [];
      groupedByX[n.position.x].push(n);
    });

    const stackedNodes = groupedByX[posX] || [];
    const isPartOfStack = stackedNodes.length > 1;

    return isPartOfStack;
  };

  const addNode = useCallback(
    (nodeId: string, direction: 'left' | 'right') => {
      const parentNode = nodes.find((node) => node.id === nodeId);
      if (!parentNode) {
        console.error(`Node with id ${nodeId} not found.`);
        return;
      }

      const newNodeId = `node-${nodes.length + 1}`;
      const offsetX = direction === 'left' ? -200 : 200;
      const newNode: CustomNode = createNewNode();

      setNodes((prevNodes) => [...prevNodes, newNode]);

      const newEdge = createNewEdge(nodeId, newNodeId);

      setEdges((prevEdges) => addEdge(newEdge, prevEdges));
    },
    [nodes, setNodes, setEdges]
  );

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

  return (
    <Box ref={popoverRef} h="110px">
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
        </PopoverTrigger>
        <PopoverContent
          bgColor="white"
          width="150px"
          boxShadow="0px 4px 32px 0px #00000026"
          rounded="8px"
          zIndex={100}
        >
          <PopoverBody m={0} px="8px">
            <VStack width="full" alignItems="flex-start" spacing="4px">
              <HStack
                w="full"
                cursor="pointer"
                color="primary.500"
                px="8px"
                py="8px"
                rounded="8px"
                transition="all 200ms ease-in-out"
                _hover={{
                  bgColor: 'neutral.200',
                }}
                onClick={() => addNode(id, 'left')}
              >
                {isPartOfStack() ? (
                  <>
                    <Icon as={ArrowUpIcon} boxSize="12px" />
                    <Text>Add Node Above </Text>
                  </>
                ) : (
                  <>
                    <Icon as={ArrowLeftIcon} boxSize="10px" />
                    <Text>Add Node Before </Text>
                  </>
                )}
              </HStack>
              <HStack
                w="full"
                cursor="pointer"
                color="primary.500"
                px="8px"
                py="8px"
                rounded="8px"
                transition="all 200ms ease-in-out"
                _hover={{
                  bgColor: 'neutral.200',
                }}
                onClick={() => addNode(id, 'right')}
              >
                {isPartOfStack() ? (
                  <>
                    <Icon as={ArrowDownIcon} boxSize="12px" />
                    <Text>Add Node Below </Text>
                  </>
                ) : (
                  <>
                    <Icon as={ArrowRightIcon} boxSize="10px" />
                    <Text>Add Node After </Text>
                  </>
                )}
              </HStack>

              <HStack
                w="full"
                cursor="pointer"
                color="primary.500"
                px="8px"
                py="8px"
                rounded="8px"
                transition="all 200ms ease-in-out"
                _hover={{
                  bgColor: 'neutral.200',
                }}
              >
                <Icon as={EditIcon} boxSize="10px" />
                <Text>Edit Node</Text>
              </HStack>

              <HStack
                w="full"
                cursor="pointer"
                color="primary.500"
                px="8px"
                py="8px"
                rounded="8px"
                transition="all 200ms ease-in-out"
                _hover={{
                  bgColor: 'neutral.200',
                }}
              >
                <Icon as={DeleteIcon} boxSize="10px" />
                <Text>Delete Node</Text>
              </HStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ApprovalNode;
