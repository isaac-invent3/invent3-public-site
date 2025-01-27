import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
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
  onDeleteNodeCallback: NodeCallback,
  onNodeClickCallback: NodeCallback
): ApprovalFlowInitialElement => {
  return {
    id: uuidv4(),
    position: DEFAULT_POSITION,
    type: 'approvalNode',
    data: {
      onNodeClickCallback,
      onDeleteNodeCallback,
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
  onAddNodeCallback: NodeCallback
): Edge => {
  return {
    id: uuidv4(),
    source: sourceNodeId,
    target: targetNodeId,
    type: 'condition',
    data: { onAddNodeCallback },
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
  targetEdgeId,
  onDeleteNodeCallback,
  onNodeClickCallback,
  onAddNodeCallback,
}: NodeUpdateParams): ApprovalFlowInitialElement[] | undefined => {
  const newNode = createNewNode(onDeleteNodeCallback, onNodeClickCallback);

  const clonedElements = _.cloneDeep(elements);

  const targetEdgeIndex = clonedElements.findIndex(
    (element) => element.id === targetEdgeId
  );

  if (targetEdgeIndex === -1) return undefined;

  const targetEdge = clonedElements[targetEdgeIndex] as Edge;
 
  const updatedTargetEdge = { ...targetEdge, target: newNode.id };
  clonedElements[targetEdgeIndex] = updatedTargetEdge;
  clonedElements.push(newNode);

  const newEdge = createNewEdge(
    newNode.id,
    targetEdge.target,
    onAddNodeCallback
  );

  clonedElements.push(newEdge);

  return clonedElements;
};

export { updateElementsWithNewNode };
