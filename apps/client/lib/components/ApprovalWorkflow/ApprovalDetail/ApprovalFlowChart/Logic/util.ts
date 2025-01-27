import { MarkerType } from '@xyflow/react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { splitNodesAndEdges } from '../Components/Utils/splitNodesAndEdges';
import {
  ApprovalFlowInitialElement,
  Edge,
  NodeCallback,
} from '../Context/interfaces';

const DEFAULT_POSITION = { x: 0, y: 0 };

interface NodeUpdateParams {
  elements: ApprovalFlowInitialElement[];
  targetEdgeId: string;
  orientation: 'vertical' | 'horizontal';
  position: 'left' | 'right';
  onDeleteNodeCallback: NodeCallback;
  onNodeClickCallback: NodeCallback;
  onAddNodeCallback: NodeCallback;
}

/**
 * Creates a new node with the given callbacks.
 * @param {NodeCallback} onDeleteNodeCallback - Callback for delete action.
 * @param {NodeCallback} onNodeClickCallback - Callback for click action.
 * @returns {ApprovalFlowInitialElement} - A new node object.
 */
const createNewNode = (
  onDeleteNode: NodeCallback,
  onNodeClick: NodeCallback
): ApprovalFlowInitialElement => {
  return {
    id: uuidv4(),
    position: DEFAULT_POSITION,
    type: 'approvalNode',
    data: {
      onNodeClick,
      onDeleteNode,
    },
  };
};

/**
 * Creates a new edge connecting a source node to a target node.
 * @param {string} sourceNodeId - ID of the source node.
 * @param {string} targetNodeId - ID of the target node.
 * @param {NodeCallback} onAddNodeCallback - Callback for adding a node.
 * @returns {Edge} - A new edge object.
 */
const createNewEdge = (
  sourceNodeId: string,
  targetNodeId: string,
  onAddNode: NodeCallback
): Edge => {
  return {
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
    data: { onAddNode },
  };
};

/**
 * Adds a new node to the approval flow and updates the edges accordingly.
 * @param {NodeUpdateParams} params - Parameters required to add the node.
 * @returns {ApprovalFlowInitialElement[] | undefined} - Updated elements array or undefined if target edge is not found.
 */
const updateElementsWithNewNode = ({
  elements,
  orientation,
  position,
  targetEdgeId,
  onDeleteNodeCallback,
  onNodeClickCallback,
  onAddNodeCallback,
}: NodeUpdateParams): ApprovalFlowInitialElement[] | undefined => {
  const newNode = createNewNode(onDeleteNodeCallback, onNodeClickCallback);

  console.log({ orientation, targetEdgeId });

  const clonedElements = _.cloneDeep(elements);

  const targetEdgeIndex = clonedElements.findIndex(
    (element) => element.id === targetEdgeId
  );

  if (targetEdgeIndex === -1) return undefined;

  const targetEdge = clonedElements[targetEdgeIndex] as Edge;

  if (orientation === 'horizontal') {
    const updatedTargetEdge = { ...targetEdge, target: newNode.id };

    // Create a new edge from the new node to the original target
    const newRightEdge = createNewEdge(
      newNode.id,
      targetEdge.target,
      onAddNodeCallback
    );

    console.log({ updatedTargetEdge, newRightEdge });

    clonedElements[targetEdgeIndex] = updatedTargetEdge;
    clonedElements.push(newRightEdge);

    console.log({ clonedElements });
  } else if (orientation === 'vertical') {
    const newVerticalEdge = createNewEdge(
      targetEdge.source,
      newNode.id,
      onAddNodeCallback
    );

    clonedElements.push(newVerticalEdge);

    const edges = splitNodesAndEdges(clonedElements).edges;

    const selectedTarget = edges.find(
      (element) => targetEdge.target === element.source
    );

    if (!selectedTarget) return;

    const newEdge = createNewEdge(
      newNode.id,
      selectedTarget.target,
      onAddNodeCallback
    );

    clonedElements.push(newEdge);
  }

  clonedElements.push(newNode);

//   if (orientation === 'horizontal') {
//     const newEdge = createNewEdge(
//       newNode.id,
//       targetEdge.target,
//       onAddNodeCallback
//     );

//     clonedElements.push(newEdge);
//   }

  return clonedElements;
};

export { updateElementsWithNewNode };
