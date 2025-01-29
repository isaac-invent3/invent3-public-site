import { MarkerType } from '@xyflow/react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { splitNodesAndEdges } from './splitNodesAndEdges';
import { ApprovalFlowElement, CustomEdge } from '../Interfaces';

const DEFAULT_POSITION = { x: 0, y: 0 };

interface NodeUpdateParams {
  elements: ApprovalFlowElement[];
  targetEdgeId: string;
  orientation: 'vertical' | 'horizontal';
}

/**
 * Creates a new node with default properties.
 * @returns {ApprovalFlowElement} - A new node object.
 */
const createNewNode = (): ApprovalFlowElement => ({
  id: uuidv4(),
  position: DEFAULT_POSITION,
  type: 'approvalNode',
  data: {},
});

/**
 * Creates a new edge connecting two nodes.
 * @param {string} sourceNodeId - ID of the source node.
 * @param {string} targetNodeId - ID of the target node.
 * @returns {CustomEdge} - A new edge object.
 */
export const createNewEdge = (
  sourceNodeId: string,
  targetNodeId: string
): CustomEdge => ({
  id: uuidv4(),
  source: sourceNodeId,
  target: targetNodeId,
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
});

/**
 * Updates the elements array by adding a new node and adjusting edges accordingly.
 * @param {NodeUpdateParams} params - Parameters required to add the node.
 * @returns {ApprovalFlowElement[] | undefined} - Updated elements array or undefined if target edge is not found.
 */
const updateElementsWithNewNode = ({
  elements,
  orientation,
  targetEdgeId,
}: NodeUpdateParams): ApprovalFlowElement[] | undefined => {
  const newNode = createNewNode();
  const clonedElements = _.cloneDeep(elements);

  const targetEdgeIndex = clonedElements.findIndex(
    (element) => element.id === targetEdgeId
  );

  if (targetEdgeIndex === -1) return undefined;

  const targetEdge = clonedElements[targetEdgeIndex] as CustomEdge;

  if (orientation === 'horizontal') {
    const updatedTargetEdge = { ...targetEdge, target: newNode.id };
    const newRightEdge = createNewEdge(newNode.id, targetEdge.target);

    clonedElements[targetEdgeIndex] = updatedTargetEdge;
    clonedElements.push(newRightEdge);
  } else if (orientation === 'vertical') {
    const newVerticalEdge = createNewEdge(targetEdge.source, newNode.id);
    clonedElements.push(newVerticalEdge);

    const edges = splitNodesAndEdges(clonedElements).edges;
    const selectedTarget = edges.find(
      (edge) => targetEdge.target === edge.source
    );

    if (!selectedTarget) return undefined;

    const newEdge = createNewEdge(newNode.id, selectedTarget.target);
    clonedElements.push(newEdge);
  }

  clonedElements.push(newNode);
  return clonedElements;
};

export { updateElementsWithNewNode };
