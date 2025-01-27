import { Position } from '@xyflow/react';
import dagre from 'dagre';
import { cloneDeep } from 'lodash';
import { isNode } from 'react-flow-renderer';
import { ApprovalFlowElement, CustomEdge } from '../Interfaces';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 180;

/**
 * Adjusts the layout of the flow elements using the Dagre graph layout algorithm.
 * @param {ApprovalFlowInitialElement[]} flowElements - The flow elements to be layouted.
 * @returns {ApprovalFlowInitialElement[]} - The flow elements with updated positions.
 */
const layoutApprovalFlowElements = (flowElements: ApprovalFlowElement[]) => {
  const clonedFlowElements = cloneDeep(flowElements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  // Add nodes and edges to the Dagre graph
  clonedFlowElements.forEach((element) => {
    if (isNode(element)) {
      dagreGraph.setNode(element.id, {
        width: element.width || NODE_WIDTH,
        height: element.height || NODE_HEIGHT,
      });
    } else {
      const edge = element as CustomEdge;
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  return clonedFlowElements.map((element) => {
    if (isNode(element)) {
      const nodeWithPosition = dagreGraph.node(element.id);

      element.targetPosition = Position.Left;
      element.sourcePosition = Position.Right;

      element.position = {
        x: (nodeWithPosition?.x || 0) - (element.width || NODE_WIDTH) / 2,
        y: (nodeWithPosition?.y || 0) - (element.height || NODE_HEIGHT) / 2,
      };
    }
    return element;
  });
};

export { layoutApprovalFlowElements };
