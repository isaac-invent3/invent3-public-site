import { Box } from '@chakra-ui/react';
import { Edge, MarkerType, Node, ReactFlowProvider } from '@xyflow/react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import ApprovalDetailsPanel from '../ApprovalDetailsPanel';
import ApprovalNode from './ApprovalNode';

const ApprovalFlowChart = () => {
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
    {
      id: 'edge-2',
      source: '1',
      target: '3',
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
    {
      id: 'edge-3',
      source: '2',
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

  return (
    <Box position="relative" width="100%">
      <Box height="75vh" width="85vw">
        <ReactFlowProvider>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
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

export default ApprovalFlowChart;
