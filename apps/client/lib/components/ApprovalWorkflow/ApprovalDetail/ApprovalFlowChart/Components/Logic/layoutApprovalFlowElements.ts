import { Position } from '@xyflow/react';
import dagre from 'dagre';
import { cloneDeep } from 'lodash';
import { ApprovalFlowElement, CustomEdge, CustomNode } from '../Interfaces';

const NODE_WIDTH = 300;
const NODE_HEIGHT = 180;

/**
 * Type guard to check if an element is a CustomNode
 */
const isCustomNode = (el: ApprovalFlowElement): el is CustomNode => {
  return (el as CustomNode).position !== undefined;
};

/**
 * Adjusts the layout of the flow elements using the Dagre graph layout algorithm.
 * @param {ApprovalFlowElement[]} flowElements - The flow elements to be layouted.
 * @returns {ApprovalFlowElement[]} - The flow elements with updated positions.
 */
export const layoutApprovalFlowElements = (
  flowElements: ApprovalFlowElement[]
): ApprovalFlowElement[] => {
  const clonedFlowElements = cloneDeep(flowElements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  // Add nodes and edges to the Dagre graph
  clonedFlowElements.forEach((element) => {
    if (isCustomNode(element)) {
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

  // Update positions based on Dagre layout
  return clonedFlowElements.map((element) => {
    if (isCustomNode(element)) {
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
