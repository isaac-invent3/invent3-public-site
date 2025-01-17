import { Box } from '@chakra-ui/react';
import { Edge, Node, ReactFlowProvider } from '@xyflow/react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import ApprovalDetailsPanel from '../ApprovalDetailsPanel';
import ApprovalNode from './ApprovalNode';
import ButtonEdge from './edges/ButtonEdge';

const ApprovalFlowChart = () => {
  const initialNodes: Node[] = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: {
        status: 'In Progress',
        currentProcess: 'Requested By',
        role: 'Operational Manager',
        approvee: 'Jerome Bell',
      },
      type: 'approvalNode',
    },

    {
      id: '2',
      position: { x: 300, y: 300 },
      data: {
        status: 'In Progress',
        currentProcess: 'Requires to Approve',
        role: 'Operational Manager',
        approvee: 'Jerome Bell',
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
      type: 'buttonedge',
    },
  ];

  const nodeTypes = {
    approvalNode: ApprovalNode,
  } as any;

  const edgeTypes = {
    buttonedge: ButtonEdge,
  };

  return (
    <Box position="relative" width="100%">
      <Box height="75vh" width="85vw">
        <ReactFlowProvider>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
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
