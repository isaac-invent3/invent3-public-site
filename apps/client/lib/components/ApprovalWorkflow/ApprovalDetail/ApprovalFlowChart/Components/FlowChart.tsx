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
import { dummyApprovalPartyInstances } from './Dummydata';
import { CustomEdge, CustomNode } from './Interfaces';
import { createNodeAndEdgesFromBaseElements } from './Logic/formatApprovalPartyToNode';
import { layoutApprovalFlowElements } from './Logic/layoutApprovalFlowElements';
import { createNewEdge } from './Logic/updateApprovalFlowElements';
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

  useEffect(() => {
    if (!data?.data.items) return;

    // const { edges, nodes } = createNodeAndEdgesFromBaseElements(
    //   data.data.items
    // );

    const { edges, nodes } = createNodeAndEdgesFromBaseElements(
      dummyApprovalPartyInstances
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

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutElements.nodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutElements.edges);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  const findClosestNodes = (currentNode: CustomNode) => {
    const { id: currentNodeId } = currentNode;
    const { x: posX } = currentNode.position;
    const overlapThreshold = 50;

    let leftNodes: CustomNode[] = [];
    let rightNodes: CustomNode[] = [];
    let overlappingNode: CustomNode | null = null;
    let minLeftDistance = Infinity;
    let minRightDistance = Infinity;

    const groupedByX: Record<number, CustomNode[]> = {};

    nodes.forEach((node) => {
      if (node.id === currentNodeId) return;

      const isOverlapping = Math.abs(node.position.x - posX) < overlapThreshold;

      if (isOverlapping) {
        overlappingNode = node;
      }

      if (!groupedByX[node.position.x]) {
        groupedByX[node.position.x] = [];
      }
      groupedByX[node.position.x].push(node);
    });

    // Find closest left and right nodes
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

  const onNodeDragStart = (_: any, node: CustomNode) => {
    setDraggingNodeId(node.id);

 
    // Remove only these edges
    // setEdges((eds) => eds.filter((edge) => !connectedEdges.includes(edge)));




      const connectedEdges = edges.filter(
        (edge) => edge.source === node.id || edge.target === node.id
      );

       const incomingEdges = edges.filter(
        (edge) => edge.target === node.id
      );

      const outgoingEdges = edges.filter(
        (edge) => edge.source === node.id
      );

            console.log({ connectedEdges, incomingEdges, outgoingEdges });



      setEdges((eds) => eds.filter((edge) => !connectedEdges.includes(edge)));


      // // Identify previous and next nodes
      // let previousNodeId: string | null = null;
      // let nextNodeId: string | null = null;

      // connectedEdges.forEach((edge) => {
      //   if (edge.target === node.id) {
      //     previousNodeId = edge.source;
      //   }
      //   if (edge.source === node.id) {
      //     nextNodeId = edge.target;
      //   }
      // });

      // // Remove edges connected to the dragged node
      // setEdges((eds) => eds.filter((edge) => !connectedEdges.includes(edge)));

      // // If both previous and next nodes exist, create a new edge between them
      // if (previousNodeId && nextNodeId) {
      //   setEdges((eds) => [
      //     ...eds,
      //     {
      //       // id: `${previousNodeId}-${nextNodeId}`,
      //       // source: previousNodeId,
      //       // target: nextNodeId,

      //       ...createNewEdge(previousNodeId, nextNodeId),
      //     },
      //   ]);
      // }
  };

  // When node stops dragging, snap to the nearest node
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

      return setEdges((eds) => {
        let newEdges = [...eds];

        incomingEdges.forEach((edge) => {
          newEdges = addEdge(
            {
              ...createNewEdge(edge?.source, node.id),
            },
            newEdges
          );
        });

        outgoingEdges.forEach((edge) => {
          newEdges = addEdge(
            {
              ...createNewEdge(node?.id, edge.target),
            },
            newEdges
          );
        });

        return newEdges;
      });
    }


    setEdges((eds) => {
      let newEdges = [...eds];

      let edgeToBeRemoved: string[] = [];

      for (let edge of newEdges) {
        for (let node of leftNodes) {
          if (edge.source === node.id) {
            !edgeToBeRemoved.includes(edge.id) && edgeToBeRemoved.push(edge.id);
          }
        }

        for (let node of rightNodes) {
          if (edge.target === node.id) {
            !edgeToBeRemoved.includes(edge.id) && edgeToBeRemoved.push(edge.id);
          }
        }
      }

      console.log({ edgeToBeRemoved });

      newEdges = newEdges.filter((edge) => !edgeToBeRemoved.includes(edge.id));
      edgeToBeRemoved = [];
      console.log(newEdges);
      // Reconnect previous sources to the new left nodes
      leftNodes.forEach((leftNode) => {
        newEdges = addEdge(
          {
            ...createNewEdge(leftNode?.id, node.id),
          },
          newEdges
        );
      });

      // Connect dragged node to the right nodes
      rightNodes.forEach((rightNode) => {
        newEdges = addEdge(
          {
            ...createNewEdge(node?.id, rightNode.id),
          },
          newEdges
        );
      });

      return newEdges;
    });

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
            minZoom={0.5}
            style={{
              ...(isLoading || isFetching ? { opacity: 0.3 } : { opacity: 1 }),
            }}
          />
        </ReactFlowProvider>
      </Box>

      <Box position="absolute" right={20} top={0}>
        <ApprovalDetailsPanel />
      </Box>
    </Box>
  );
};

export default FlowChart;
