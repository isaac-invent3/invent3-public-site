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

  const { getNodes, setNodes, setEdges, getEdges } = useReactFlow();

  const nodes = getNodes();
  const edges = getEdges();

  // const isPartOfStack = () => {
  //   const currentNode = nodes.find((item) => item.id == id);

  //   if (!currentNode) return false;

  //   const posX = currentNode.position.x;

  //   const groupedByX: Record<number, CustomNode[]> = {};

  //   nodes.forEach((n) => {
  //     if (!groupedByX[n.position.x]) groupedByX[n.position.x] = [];
  //     groupedByX[n.position.x].push(n);
  //   });

  //   const stackedNodes = groupedByX[posX] || [];
  //   const isPartOfStack = stackedNodes.length > 1;

  //   return isPartOfStack;
  // };

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

  const findClosestNodes = (currentNode: CustomNode) => {
    const {
      id: currentNodeId,
      position: { x: posX },
    } = currentNode;
    const overlapThreshold = 50; // Distance threshold to consider nodes as overlapping

    let leftNodes: CustomNode[] = [];
    let rightNodes: CustomNode[] = [];
    let overlappingNode: CustomNode | null = null;
    let minLeftDistance = Infinity;
    let minRightDistance = Infinity;

    const groupedByX: Record<number, CustomNode[]> = {};

    // Group nodes by their X position
    nodes.forEach((node) => {
      if (node.id === currentNodeId) return;

      const isOverlapping = Math.abs(node.position.x - posX) < overlapThreshold;
      if (isOverlapping) {
        overlappingNode = node;
      }

      // Group nodes with the same X position
      if (!groupedByX[node.position.x]) {
        groupedByX[node.position.x] = [];
      }
      groupedByX[node.position.x].push(node);
    });

    // Find the closest left and right nodes based on X position
    Object.entries(groupedByX).forEach(([xStr, stackedNodes]) => {
      const x = parseFloat(xStr);
      const distance = x - posX;

      if (distance < 0 && Math.abs(distance) < minLeftDistance) {
        minLeftDistance = Math.abs(distance);
        leftNodes = stackedNodes;
      }

      if (distance > 0 && Math.abs(distance) < minRightDistance) {
        minRightDistance = Math.abs(distance);
        rightNodes = stackedNodes;
      }
    });

    return { leftNodes, rightNodes, overlappingNode };
  };

  const onNodeDragStop = (position: 'right' | 'left' | 'top' | 'bottom') => {
    const currentNode = nodes.find((item) => item.id === id);

    if (!currentNode) return;

    const newNode = createNewNode();

    setNodes((nds) => [...nds, newNode]);

    const incomingEdges = edges.filter(
      (edge) => edge.target === currentNode.id
    );
    const outgoingEdges = edges.filter(
      (edge) => edge.source === currentNode.id
    );

    if (position === 'top') {
      if (incomingEdges.length > 1 || outgoingEdges.length > 1) {
        if (incomingEdges.length > 1) {
          const newNodeLeft = createNewNode('stackJoiner');

          setNodes((nds) => [...nds, newNodeLeft]);

          setEdges((eds) => {
            let updatedEdges = [...eds];

            updatedEdges = updatedEdges.filter(
              (edge) => edge.target !== currentNode.id
            );

            incomingEdges.forEach((edge) => {
              updatedEdges = addEdge(
                {
                  ...edge,
                  target: newNodeLeft.id!,
                },
                updatedEdges
              );
            });

            updatedEdges = addEdge(
              {
                ...createNewEdge(newNodeLeft.id, currentNode.id),
              },
              updatedEdges
            );
            updatedEdges = addEdge(
              {
                ...createNewEdge(newNodeLeft.id, newNode.id),
              },
              updatedEdges
            );

            return updatedEdges;
          });
        }

        if (outgoingEdges.length > 1) {
          const newNodeRight = createNewNode('stackJoiner');

          setNodes((nds) => [...nds, newNodeRight]);

          setEdges((eds) => {
            let updatedEdges = [...eds];

            updatedEdges = updatedEdges.filter(
              (edge) => edge.source !== currentNode.id
            );

            outgoingEdges.forEach((edge) => {
              updatedEdges = addEdge(
                {
                  ...edge,
                  source: newNodeRight.id!,
                },
                updatedEdges
              );
            });

            updatedEdges = addEdge(
              {
                ...createNewEdge(currentNode.id, newNodeRight.id),
              },
              updatedEdges
            );

            if (incomingEdges.length == 1) {
              incomingEdges.forEach((edge) => {
                updatedEdges = addEdge(
                  {
                    ...createNewEdge(edge.source, newNode.id),
                  },
                  updatedEdges
                );
              });
            }

            updatedEdges = addEdge(
              {
                ...createNewEdge(newNode.id, newNodeRight.id),
              },
              updatedEdges
            );

            return updatedEdges;
          });
        }

        onClose();

        return;
      }

      setEdges((eds) => {
        let updatedEdges = [...eds];

        incomingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...createNewEdge(edge.source, newNode.id),
            },
            updatedEdges
          );
        });

        outgoingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...createNewEdge(newNode.id, edge.target),
            },
            updatedEdges
          );
        });

        return updatedEdges;
      });
    }

    if (position === 'right') {
      setEdges((eds) => {
        let updatedEdges = [...eds];

        outgoingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...edge,
              source: newNode.id!,
            },
            updatedEdges
          );
        });

        updatedEdges = addEdge(
          {
            ...createNewEdge(currentNode.id, newNode.id),
          },
          updatedEdges
        );

        return updatedEdges;
      });
    }

    if (position === 'left') {
      setEdges((eds) => {
        let updatedEdges = [...eds];

        incomingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...edge,
              target: newNode.id!,
            },
            updatedEdges
          );
        });

        updatedEdges = addEdge(
          {
            ...createNewEdge(newNode.id, currentNode.id),
          },
          updatedEdges
        );

        return updatedEdges;
      });
    }

    onClose();
  };

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
          zIndex={9999} // Very high z-index
          position="relative"
        >
          <PopoverBody m={0} px="8px">
            <VStack
              width="full"
              alignItems="flex-start"
              spacing="4px"
              zIndex={100}
            >
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
                onClick={() => onNodeDragStop('top')}
              >
                <Icon as={ArrowUpIcon} boxSize="12px" />
                <Text>Add Node Above </Text>
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
                onClick={() => onNodeDragStop('bottom')}
              >
                <Icon as={ArrowDownIcon} boxSize="12px" />
                <Text>Add Node Below </Text>
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
                onClick={() => onNodeDragStop('left')}
              >
                <Icon as={ArrowLeftIcon} boxSize="10px" />
                <Text>Add Node Before </Text>
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
                onClick={() => onNodeDragStop('right')}
              >
                <Icon as={ArrowRightIcon} boxSize="10px" />
                <Text>Add Node After </Text>
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
