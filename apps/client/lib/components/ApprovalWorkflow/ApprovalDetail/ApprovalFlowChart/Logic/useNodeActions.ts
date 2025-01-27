import { getIncomers, getOutgoers } from '@xyflow/react';
import _ from 'lodash';
import { useApprovalFlowContext } from '../Context';
import { CustomNodeData, Edge, Node } from '../Context/interfaces';
import { updateElementsWithNewNode } from './util';

/**
 * Custom hook for managing node actions within the approval flow.
 * @returns {object} - Object containing node action callbacks.
 */
const useNodeActions = () => {
  const { setElements } = useApprovalFlowContext();

  /**
   * Deletes a node and updates the elements by reconnecting its edges.
   * @param {string} nodeId - ID of the node to delete.
   */
  const handleDeleteNode = (nodeId: string) => {
    setElements((elements) => {
      const clonedElements = _.cloneDeep(elements);

      const incomingEdges = clonedElements.filter(
        (element): element is Edge =>
          'target' in element && element.target === nodeId
      );
      const outgoingEdges = clonedElements.filter(
        (element): element is Edge =>
          'source' in element && element.source === nodeId
      );

      // Update incoming edges to point to the outgoing edge's target node.
      const updatedIncomingEdges = incomingEdges.map((edge) => ({
        ...edge,
        target: outgoingEdges[0]?.target,
      }));

      // Remove the deleted node and its edges from the elements.
      const filteredElements = clonedElements.filter(
        (element) =>
          element.id !== nodeId &&
          (!('target' in element) ||
            element.target !== incomingEdges[0]?.target) &&
          (!('source' in element) ||
            element.source !== outgoingEdges[0]?.source)
      );

      // Return original elements if no updates are made.
      if (!updatedIncomingEdges) return elements;

      // Add updated incoming edges to the filtered elements.
      filteredElements.push(...updatedIncomingEdges);
      return filteredElements;
    });
  };

  /**
   * Logs details about a node's incomers and outgoers and displays an alert.
   * @param {string} nodeId - ID of the node clicked.
   */
  const handleNodeClick = (nodeId: string) => {
    setElements((elements) => {
      const currentNode = elements.find((element) => element.id === nodeId);
      if (!currentNode) return elements;

      const nodes = elements.filter(
        (element): element is Node => 'position' in element
      );
      const edges = elements.filter(
        (element): element is Edge => 'source' in element && 'target' in element
      );

      console.error({
        incomers: getIncomers(currentNode, nodes as any, edges as any),
        outgoers: getOutgoers(currentNode, nodes as any, edges as any),
      });

      return elements;
    });

    alert(`You clicked the "${nodeId}" node`);
  };

  const handleUpdateNode = (nodeId: string, data: Partial<CustomNodeData>) => {
    setElements((elements) => {
      const clonedElements = _.cloneDeep(elements);

      const currentNodeIndex = clonedElements.findIndex(
        (element) => element.id === nodeId
      );

      if (currentNodeIndex === -1) return elements;

      const currentNode = clonedElements[currentNodeIndex];

      if (!currentNode) return elements;

      const updatedNode = {
        ...currentNode,
        data: { ...currentNode.data, ...data },
      };

      clonedElements[currentNodeIndex] = updatedNode;

      return clonedElements;
    });
  };

  /**
   * Adds a new node connected to the specified edge.
   * @param {string} edgeId - ID of the edge where the new node will be added.
   */
  const handleAddNode = (
    edgeId: string,
    orientation: 'vertical' | 'horizontal'
  ) => {
    setElements((elements) => {
      const updatedElements = updateElementsWithNewNode({
        elements,
        orientation,
        targetEdgeId: edgeId,
        onAddNodeCallback: handleAddNode,
        onDeleteNodeCallback: handleDeleteNode,
        onNodeClickCallback: handleNodeClick,
      });

      console.log({ updatedElements });

      return updatedElements ?? elements;
    });
  };

  return {
    onDeleteNode: handleDeleteNode,
    onNodeClick: handleNodeClick,
    onAddNode: handleAddNode,
    onUpdateNode: handleUpdateNode,
  };
};

export default useNodeActions;
