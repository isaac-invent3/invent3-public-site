import { Box } from '@chakra-ui/react';
import {
  Edge,
  MarkerType,
  Node,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { splitNodesAndEdges } from '../Components/Utils/splitNodesAndEdges';
import { useApprovalFlowContext } from '../Context';
import { initialElements } from '../Data/Elements1';
import { getLayoutedElements } from '../Logic/layoutUtil';
import useNodeActions from '../Logic/useNodeActions';
import ApprovalDetailsPanel from '../RightPanel';
import CustomEdge from './Edges';
import ApprovalNode from './Nodes';
// import { edgeTypes } from './Edges';

const FlowChart = () => {
  const initialNodes: Node[] = [
    {
      id: '1',
      position: { x: 0, y: 166 },
      data: {
        status: 'completed',
        currentProcess: 'Requested By',
        role: 'Operational Manager',
        approvee: 'Jerome Bell',
      },
      type: 'approvalNode',
    },

    {
      id: '2',
      position: { x: 288, y: 61 },
      data: {
        status: 'pending',
        currentProcess: 'Require to Approve',
        role: 'Operational Manager',
        approvee: 'Jerome Bell',
        date: 'June 20, 2024',
      },
      type: 'approvalNode',
    },

    {
      id: '3',
      position: { x: 288, y: 290 },
      data: {
        status: 'not-started',
        currentProcess: 'Inform when Approved',
        role: 'Operational Manager',
        approvee: 'George Washington',
      },
      type: 'approvalNode',
    },

    {
      id: '4',
      position: { x: 588, y: 166 },
      data: {
        status: 'not-started',
        currentProcess: 'Require to Approve',
        role: 'Regional Manager',
        approvee: 'Tasha Bell',
      },
      type: 'approvalNode',
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'edge-1',
      source: '1',
      target: '2',
      sourceHandle: 'output',
      type: 'condition',
      style: {
        stroke: '#656565',
        strokeWidth: 1,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        width: 30,
        height: 30,
        color: '#656565',
      },
    },
    {
      id: 'edge-2',
      source: '1',
      target: '3',
      sourceHandle: 'output',
      type: 'condition',
      style: {
        stroke: '#656565',
        strokeWidth: 1,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        width: 30,
        height: 30,
        color: '#656565',
      },
    },
    {
      id: 'edge-3',
      source: '2',
      target: '4',
      sourceHandle: 'output',
      type: 'condition',
      style: {
        stroke: '#656565',
        strokeWidth: 1,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        width: 30,
        height: 30,
        color: '#656565',
      },
    },
    {
      id: 'edge-4',
      source: '3',
      target: '4',
      sourceHandle: 'output',
      type: 'smoothstep',
      style: {
        stroke: '#656565',
        strokeWidth: 1,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        width: 30,
        height: 30,
        color: '#656565',
      },
    },
  ];

  const nodeTypes = {
    approvalNode: ApprovalNode,
  } as any;

  const edgeTypes = {
    condition: CustomEdge,
  };

  const { onAddNode, onDeleteNode, onNodeClick } = useNodeActions();
  const { setElements, elements } = useApprovalFlowContext();

  const [layoutElements, setLayoutElements] = useState<any[]>([]);

  useEffect(() => {
    const nodes = splitNodesAndEdges(initialElements).nodes.map((x) => ({
      ...x,
      type: 'approvalNode',
      data: { ...x.data, onDeleteNode, onNodeClick },
    }));

    const edges = splitNodesAndEdges(initialElements).edges.map((x) => ({
      ...x,
      type: 'condition',
      sourceHandle: 'output',
      style: {
        stroke: '#656565',
        strokeWidth: 1,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        width: 30,
        height: 30,
        color: '#656565',
      },
      data: { ...x.data, onAddNode },
    }));

    setElements([...nodes, ...edges]);
  }, []);

  useEffect(() => {
    setLayoutElements(getLayoutedElements(elements));
  }, [elements]);

  const layoutNodes = layoutElements.filter((x) => x.position);
  const layoutEdges = layoutElements.filter((x) => !x.position);

  return (
    <Box position="relative" width="100%">
      <Box height="75vh" width="85vw">
        <ReactFlowProvider>
          <ReactFlow
            nodes={layoutNodes}
            edges={layoutEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            panOnScroll
            minZoom={0.5}
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
