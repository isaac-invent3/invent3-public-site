import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { addEdge, useReactFlow } from '@xyflow/react';
import {
  createNewEdge,
  createNewNode,
} from '../../../Logic/updateApprovalFlowElements';

import { useState } from 'react';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import NodeFormModal from '../NodeForm';
import DeleteNodePopover from './DeleteNodePopover';

interface PopoverActionProps {
  nodeId: string;
  data: Partial<ApprovalWorkflowPartyInstance>;
}

const PopoverAction = (props: PopoverActionProps) => {
  const {
    isOpen: isOpenNodeForm,
    onOpen: onOpenNodeForm,
    onClose: onCloseNodeForm,
  } = useDisclosure();

  const { nodeId, data } = props;

  const { getNodes, setNodes, setEdges, getEdges } = useReactFlow();

  const nodes = getNodes();
  const edges = getEdges();

  const onNodeDragStop = (position: 'right' | 'left' | 'top' | 'bottom') => {
    const currentNode = nodes.find((item) => item.id === nodeId);

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
  };

  type NodePosition = 'right' | 'left' | 'same_level';

  const [nodePosition, setNodePosition] = useState<NodePosition | null>(null);

  const [editNode, setEditNode] = useState(false);

  const handleAddNode = (position: 'right' | 'left' | 'same_level') => {
    setEditNode(false);
    setNodePosition(position);
    onOpenNodeForm();
  };

  const handleEditNode = () => {
    onOpenNodeForm();
    setEditNode(true);
  };

  return (
    <>
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="4px"
        zIndex={100}
        boxShadow="lg"
        overflow="hidden"
        p="8px"
      >
        <HStack
          w="full"
          cursor="pointer"
          color="primary.500"
          p="8px"
          rounded="4px"
          transition="all 200ms ease-in-out"
          _hover={{
            bgColor: 'neutral.200',
          }}
          onClick={() => handleAddNode('same_level')}
        >
          <Text>Add Node Same Level </Text>
        </HStack>

        <HStack
          w="full"
          cursor="pointer"
          color="primary.500"
          p="8px"
          rounded="4px"
          transition="all 200ms ease-in-out"
          _hover={{
            bgColor: 'neutral.200',
          }}
          onClick={() => handleAddNode('left')}
        >
          <Text>Add Node Before </Text>
        </HStack>

        <HStack
          w="full"
          cursor="pointer"
          color="primary.500"
          p="8px"
          rounded="4px"
          transition="all 200ms ease-in-out"
          _hover={{
            bgColor: 'neutral.200',
          }}
          onClick={() => handleAddNode('right')}
        >
          <Text>Add Node After </Text>
        </HStack>
        <HStack
          w="full"
          cursor="pointer"
          color="primary.500"
          p="8px"
          rounded="4px"
          transition="all 200ms ease-in-out"
          onClick={handleEditNode}
          _hover={{
            bgColor: 'neutral.200',
          }}
        >
          <Text>Edit Node</Text>
        </HStack>

        <DeleteNodePopover
          approvalWorkflowPartyIntanceId={data.approvalWorkFlowPartyInstanceId!}
        />
      </VStack>

      {isOpenNodeForm && nodePosition && (
        <NodeFormModal
          isOpen={isOpenNodeForm}
          onClose={onCloseNodeForm}
          type={editNode ? 'edit' : 'add'}
          nodeId={nodeId}
          position={nodePosition}
          selectedInstance={data as ApprovalWorkflowPartyInstance}
        />
      )}
    </>
  );
};

export default PopoverAction;
