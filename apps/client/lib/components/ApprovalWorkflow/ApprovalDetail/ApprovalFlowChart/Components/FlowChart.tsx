import { Box } from '@chakra-ui/react';
import {
  addEdge,
  Connection,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useGetAllApprovalWorkflowPartyInstancesQuery } from '~/lib/redux/services/approval-workflow/partyInstances.services';
import { ROUTES } from '~/lib/utils/constants';
import ApprovalDetailsPanel from '../RightPanel';
import { useApprovalFlowContext } from './Context';
import { CustomEdge, CustomNode } from './Interfaces';
import { createNodeAndEdgesFromBaseElements } from './Logic/formatApprovalPartyToNode';
import { layoutApprovalFlowElements } from './Logic/layoutApprovalFlowElements';
import {
  createNewEdge,
  createNewNode,
} from './Logic/updateApprovalFlowElements';
import edgeTypes from './UI/Edges';
import nodeTypes from './UI/Nodes';

const FlowChart = () => {
  const { setElements, elements } = useApprovalFlowContext();

  const pathname = usePathname();
  const router = useRouter();

  const approvalRequestId = Number(pathname.split('/')[2]);

  const { data, isLoading, isFetching } =
    useGetAllApprovalWorkflowPartyInstancesQuery(
      {
        pageNumber: 1,
        pageSize: 100,
        approvalRequestId,
      },
      { skip: !approvalRequestId }
    );

  const [layoutElements, setLayoutElements] = useState<{
    nodes: CustomNode[];
    edges: CustomEdge[];
  }>({ nodes: [], edges: [] });
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutElements.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutElements.edges);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.data.items) return;

    const { edges, nodes } = createNodeAndEdgesFromBaseElements(
      data?.data.items
    );

    setElements([...nodes, ...edges]);
  }, [data]);

  useEffect(() => {
    const layedOutElements = layoutApprovalFlowElements(elements);

    const nodes = layedOutElements.filter(
      (el): el is CustomNode => 'position' in el
    );
    const edges = layedOutElements.filter(
      (el): el is CustomEdge => 'source' in el && 'target' in el
    );

    setLayoutElements({
      nodes,
      edges,
    });
  }, [elements]);

  const stackJoinerHelpers = {
    createStackJoiner: (
      node: CustomNode,
      nodes: CustomNode[],
      edges: CustomEdge[],
      createNewNode: (type?: string) => CustomNode
    ) => {
      const incomingEdges = edges.filter((e) => e.target === node.id);
      const outgoingEdges = edges.filter((e) => e.source === node.id);

      if (incomingEdges.length <= 1 || outgoingEdges.length <= 1) {
        return { newNodes: nodes, newEdges: edges };
      }

      const newNode = createNewNode('stackJoiner');
      const newNodes = [...nodes, newNode];

      const updatedEdges = edges
        .map((edge) => {
          if (edge.target === node.id) return { ...edge, target: newNode.id };
          if (edge.source === node.id) return { ...edge, source: newNode.id };
          return edge;
        })
        .filter((edge) => edge.source !== node.id && edge.target !== node.id);

      return { newNodes, newEdges: updatedEdges };
    },

    checkAndRemoveStackJoiners: (nodes: CustomNode[], edges: CustomEdge[]) => {
      const stackJoiners = nodes.filter((n) => n.type === 'stackJoiner');
      let newEdges = [...edges];
      let newNodes = [...nodes];

      stackJoiners.forEach((joiner) => {
        const incoming = newEdges.filter((e) => e.target === joiner.id);
        const outgoing = newEdges.filter((e) => e.source === joiner.id);

        // Check incoming side
        const incomingSources = [...new Set(incoming.map((e) => e.source))];
        if (incomingSources.length === 1) {
          const sourceId = incomingSources[0];
          outgoing.forEach((e) => {
            if (
              !newEdges.some(
                (ne) => ne.source === sourceId && ne.target === e.target
              )
            ) {
              newEdges.push({ ...e, source: sourceId });
            }
          });
          newEdges = newEdges.filter(
            (e) => !(e.source === joiner.id || e.target === joiner.id)
          );
          newNodes = newNodes.filter((n) => n.id !== joiner.id);
        }

        // Check outgoing side
        const outgoingTargets = [...new Set(outgoing.map((e) => e.target))];
        if (outgoingTargets.length === 1) {
          const targetId = outgoingTargets[0];
          incoming.forEach((e) => {
            if (
              !newEdges.some(
                (ne) => ne.source === e.source && ne.target === targetId
              )
            ) {
              newEdges.push({ ...e, target: targetId });
            }
          });
          newEdges = newEdges.filter(
            (e) => !(e.source === joiner.id || e.target === joiner.id)
          );
          newNodes = newNodes.filter((n) => n.id !== joiner.id);
        }
      });

      return { nodes: newNodes, edges: newEdges };
    },

    replaceStackJoinerWithNode: (
      newNode: CustomNode,
      nodes: CustomNode[],
      edges: CustomEdge[]
    ) => {
      const stackJoiners = nodes.filter((n) => n.type === 'stackJoiner');
      let newEdges = [...edges];
      let newNodes = [...nodes];

      stackJoiners.forEach((joiner) => {
        const incoming = newEdges.filter((e) => e.target === joiner.id);
        const outgoing = newEdges.filter((e) => e.source === joiner.id);

        // Check if new node fully replaces the stackJoiner
        const isFullReplacement =
          incoming.every((e) =>
            newEdges.some(
              (ne) => ne.source === e.source && ne.target === newNode.id
            )
          ) &&
          outgoing.every((e) =>
            newEdges.some(
              (ne) => ne.source === newNode.id && ne.target === e.target
            )
          );

        if (isFullReplacement) {
          newEdges = newEdges.filter(
            (e) => !(e.source === joiner.id || e.target === joiner.id)
          );
          newNodes = newNodes.filter((n) => n.id !== joiner.id);
        }
      });

      return { nodes: newNodes, edges: newEdges };
    },
  };

  /**
   * Handles the start of a node drag event.
   * - Updates the dragging node's ID.
   * - Removes or updates edges connected to the dragged node.
   * - Replaces outgoing edges with updated connections based on the dragged node's previous connections.
   *
   * @param {any} _ - The event data (unused in this implementation).
   * @param {CustomNode} node - The node that is being dragged.
   */
  const onNodeDragStart = (_: any, node: CustomNode) => {
    setDraggingNodeId(node.id);

    const { position } = node;
    const posX = position.x;

    const connectedEdges = edges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );

    let previousNodeId: string | null = null;
    let nextNodeId: string | null = null;

    connectedEdges.forEach((edge) => {
      if (edge.target === node.id) {
        previousNodeId = edge.source;
      }
      if (edge.source === node.id) {
        nextNodeId = edge.target;
      }
    });

    const outgoingEdges = edges.filter((edge) => edge.source === node.id);
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    // Group nodes by X position to detect vertical stacks
    const groupedByX: Record<number, CustomNode[]> = {};

    nodes.forEach((n) => {
      if (!groupedByX[n.position.x]) groupedByX[n.position.x] = [];
      groupedByX[n.position.x].push(n);
    });

    

    const stackedNodes = groupedByX[posX] || [];
    const isPartOfStack = stackedNodes.length > 1;

    if (incomingEdges.length > 1 && outgoingEdges.length > 1) {
      const { newNodes, newEdges } = stackJoinerHelpers.createStackJoiner(
        node,
        nodes,
        edges,
        createNewNode
      );

      setNodes(newNodes);
      setEdges(newEdges);
      return;
    }

    // If node is in a stack with others, just remove its edges and return
    if (isPartOfStack) {
      console.log(
        'isPart',
        nodes,
        connectedEdges,
        edges,
        edges.filter((edge) => !connectedEdges.includes(edge))
      );
      return setEdges((eds) =>
        eds.filter((edge) => !connectedEdges.includes(edge))
      );
    }

    setEdges((eds) => {
      let updatedEdges = [...eds];

      if (nextNodeId) {
        incomingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...edge,
              target: nextNodeId!,
            },
            updatedEdges
          );
        });
      }

      if (previousNodeId) {
        outgoingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...edge,
              source: previousNodeId!,
            },
            updatedEdges
          );
        });
      }

      return updatedEdges;
    });

    if (connectedEdges.length <= 2) {
      return setEdges((eds) =>
        eds.filter((edge) => !connectedEdges.includes(edge))
      );
    }

    const remainingConnectedEdges = edges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );

    setEdges((eds) =>
      eds.filter((edge) => !remainingConnectedEdges.includes(edge))
    );
  };

  /**
   * Finds the closest nodes to the current node based on its position.
   * - Identifies overlapping nodes within a defined threshold.
   * - Groups nodes by their X-axis positions.
   * - Determines the closest nodes on the left and right sides of the current node.
   *
   * @param {CustomNode} currentNode - The node whose closest nodes are being searched.
   * @returns {Object} - An object containing:
   *   - `leftNodes`: The closest nodes to the left of the current node.
   *   - `rightNodes`: The closest nodes to the right of the current node.
   *   - `overlappingNode`: The node that overlaps with the current node, if any.
   */
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

  /**
   * Handles the end of a node drag event and adjusts edges accordingly.
   * - Snap the dragged node to the nearest overlapping or closest nodes.
   * - Updates edges by removing, adding, or reconnecting them based on the dragged node's new position.
   *
   * @param {any} _ - The event data (unused in this implementation).
   * @param {CustomNode} node - The node that was dragged and released.
   */
  const onNodeDragStop = (_: any, node: CustomNode) => {
    if (!draggingNodeId) return;

    const { leftNodes, rightNodes, overlappingNode } = findClosestNodes(node);

    if (overlappingNode) {
      const incomingEdges = edges.filter(
        (edge) => edge.target === overlappingNode.id
      );
      const outgoingEdges = edges.filter(
        (edge) => edge.source === overlappingNode.id
      );

      if (overlappingNode.type === 'stackJoiner') {
        console.log(overlappingNode.id);
        setEdges((eds) => {
          let updatedEdges = [...eds];

          incomingEdges.forEach((edge) => {
            updatedEdges = addEdge(
              {
                ...edge,
                target: node.id!,
              },
              updatedEdges
            );
          });

          outgoingEdges.forEach((edge) => {
            updatedEdges = addEdge(
              {
                ...edge,
                source: node.id!,
              },
              updatedEdges
            );
          });

          updatedEdges = updatedEdges.filter(
            (edge) =>
              edge.source !== overlappingNode.id &&
              edge.target !== overlappingNode.id
          );

          return updatedEdges;
        });

        return setNodes((nds) =>
          nds.filter((n) => n.id !== overlappingNode.id)
        );
      }

      if (incomingEdges.length > 1 || outgoingEdges.length > 1) {
        console.log('sd');
        if (incomingEdges.length > 1) {
          const newNodeLeft = createNewNode('stackJoiner');

          setNodes((nds) => [...nds, newNodeLeft]);

          setEdges((eds) => {
            let updatedEdges = [...eds];

            updatedEdges = updatedEdges.filter(
              (edge) => edge.target !== overlappingNode.id
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

            // outgoingEdges.forEach((edge) => {
            //   updatedEdges = addEdge(
            //     {
            //       ...createNewEdge(node.id, edge.source),
            //     },
            //     updatedEdges
            //   );
            // });

            updatedEdges = addEdge(
              {
                ...createNewEdge(newNodeLeft.id, overlappingNode.id),
              },
              updatedEdges
            );
            updatedEdges = addEdge(
              {
                ...createNewEdge(newNodeLeft.id, node.id),
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
              (edge) => edge.source !== overlappingNode.id
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
                ...createNewEdge(overlappingNode.id, newNodeRight.id),
              },
              updatedEdges
            );

            if (incomingEdges.length == 1) {
              incomingEdges.forEach((edge) => {
                updatedEdges = addEdge(
                  {
                    ...createNewEdge(edge.source, node.id),
                  },
                  updatedEdges
                );
              });
            }

            updatedEdges = addEdge(
              {
                ...createNewEdge(node.id, newNodeRight.id),
              },
              updatedEdges
            );

            return updatedEdges;
          });
        }

        return;
      }

      return setEdges((eds) => {
        let updatedEdges = [...eds];

        incomingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...createNewEdge(edge.source, node.id),
            },
            updatedEdges
          );
        });

        outgoingEdges.forEach((edge) => {
          updatedEdges = addEdge(
            {
              ...createNewEdge(node.id, edge.target),
            },
            updatedEdges
          );
        });

        return updatedEdges;
      });
    }

    // If no overlapping node, adjust edges based on left and right nodes
    setEdges((eds) => {
      let updatedEdges = [...eds];
      let edgesToRemove: string[] = [];

      // Identify edges to remove based on left and right nodes
      updatedEdges.forEach((edge) => {
        leftNodes.forEach((leftNode) => {
          if (edge.source === leftNode.id && !edgesToRemove.includes(edge.id)) {
            edgesToRemove.push(edge.id);
          }
        });

        rightNodes.forEach((rightNode) => {
          if (
            edge.target === rightNode.id &&
            !edgesToRemove.includes(edge.id)
          ) {
            edgesToRemove.push(edge.id);
          }
        });
      });

      updatedEdges = updatedEdges.filter(
        (edge) => !edgesToRemove.includes(edge.id)
      );

      // Reconnect edges to the left and right nodes
      leftNodes.forEach((leftNode) => {
        updatedEdges = addEdge(
          {
            ...createNewEdge(leftNode.id, node.id),
          },
          updatedEdges
        );
      });

      rightNodes.forEach((rightNode) => {
        updatedEdges = addEdge(
          {
            ...createNewEdge(node.id, rightNode.id),
          },
          updatedEdges
        );
      });

      const { nodes: updatedNodes, edges: cleanedEdges } =
        stackJoinerHelpers.checkAndRemoveStackJoiners(nodes, updatedEdges);

      setNodes(updatedNodes);

      return cleanedEdges;
    });

    // Reset dragging state
    setDraggingNodeId(null);
  };

  const onConnect = useCallback(
    (params: CustomEdge | Connection) =>
      setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  useEffect(() => {
    if (layoutElements.edges) {
      setEdges(layoutElements.edges);
    }

    if (layoutElements.nodes) {
      setNodes(layoutElements.nodes);
    }
  }, [layoutElements]);

  useEffect(() => {
    const layedOutElements = layoutApprovalFlowElements([...nodes, ...edges]);

    const nodesss = layedOutElements.filter(
      (el): el is CustomNode => 'position' in el
    );

    setNodes(nodesss);
  }, [edges]);

  if (!approvalRequestId) return router.push(ROUTES.APPROVAL);

  return (
    <Box position="relative" width="100%">
      <Box height="75vh" width="85vw">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            snapToGrid
            snapGrid={[10, 10]}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            fitView
            style={{
              ...(isLoading || isFetching ? { opacity: 0.3 } : { opacity: 1 }),
            }}
          ></ReactFlow>
        </ReactFlowProvider>
      </Box>

      <Box position="absolute" right={20} top={0}>
        <ApprovalDetailsPanel />
      </Box>
    </Box>
  );
};

export default FlowChart;
