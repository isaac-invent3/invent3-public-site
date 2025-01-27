import { Box } from '@chakra-ui/react';
import { MarkerType, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import ApprovalDetailsPanel from '../RightPanel';
import { useApprovalFlowContext } from './Context';
import { initialElements } from './Dummydata';
import { ApprovalFlowElement, CustomEdge, CustomNode } from './Interfaces';
import { layoutApprovalFlowElements } from './Logic/layoutApprovalFlowElements';
import { splitNodesAndEdges } from './Logic/splitNodesAndEdges';
import edgeTypes from './UI/Edges';
import nodeTypes from './UI/Nodes';

const FlowChart = () => {
  const { setElements, elements } = useApprovalFlowContext();

  const [layoutElements, setLayoutElements] = useState<ApprovalFlowElement[]>(
    []
  );

  useEffect(() => {
    const nodes = splitNodesAndEdges(initialElements).nodes.map((x) => ({
      ...x,
      type: 'approvalNode',
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
    }));

    setElements([...nodes, ...edges]);
  }, []);

  useEffect(() => {
    setLayoutElements(layoutApprovalFlowElements(elements));
  }, [elements]);

  const layoutNodes = layoutElements.filter(
    (el): el is CustomNode => 'position' in el
  );
  const layoutEdges = layoutElements.filter(
    (el): el is CustomEdge => 'source' in el && 'target' in el
  );

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
