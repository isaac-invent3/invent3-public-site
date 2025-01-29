import { getIncomers, getOutgoers } from '@xyflow/react';
import _ from 'lodash';
import { useApprovalFlowContext } from '../Context';
import { CustomEdge, CustomNode, CustomNodeData } from '../Interfaces';
import { updateElementsWithNewNode } from './updateApprovalFlowElements';

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
        (element): element is CustomEdge =>
          'target' in element && element.target === nodeId
      );
      const outgoingEdges = clonedElements.filter(
        (element): element is CustomEdge =>
          'source' in element && element.source === nodeId
      );

      const updatedIncomingEdges = incomingEdges.map((edge) => ({
        ...edge,
        target: outgoingEdges[0]?.target ?? nodeId,
      }));

      const filteredElements = clonedElements.filter((element) => {
        const isNotNode = element.id !== nodeId;
        const isNotIncomingTarget =
          !('target' in element) || element.target !== incomingEdges[0]?.target;
        const isNotOutgoingSource =
          !('source' in element) || element.source !== outgoingEdges[0]?.source;

        return isNotNode && isNotIncomingTarget && isNotOutgoingSource;
      });

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
        (element): element is CustomNode => 'position' in element
      );
      const edges = elements.filter(
        (element): element is CustomEdge =>
          'source' in element && 'target' in element
      );

      console.error({
        incomers: getIncomers(currentNode, nodes as any, edges as any),
        outgoers: getOutgoers(currentNode, nodes as any, edges as any),
      });

      return elements;
    });
  };

  /**
   * Updates the data of a node with the given ID.
   * @param {string} nodeId - ID of the node to update.
   * @param {Partial<CustomNodeData>} data - Data to merge into the node's current data.
   */
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
   * @param {"vertical" | "horizontal"} orientation - Orientation of the new node.
   */
  const handleAddNodeByEdge = (
    edgeId: string,
    orientation: 'vertical' | 'horizontal'
  ) => {
    setElements((elements) => {
      const updatedElements = updateElementsWithNewNode({
        elements,
        orientation,
        targetEdgeId: edgeId,
      });

      console.log({ updatedElements });

      return updatedElements ?? elements;
    });
  };

  /**
   * Adds a new node connected to the specified edge.
   * @param {string} edgeId - ID of the edge where the new node will be added.
   * @param {"vertical" | "horizontal"} orientation - Orientation of the new node.
   */
  const handleAddNodeByNode = (
    nodeId: string,
    location: 'left' | 'right' | 'top' | 'bottom'
  ) => {
    setElements((elements) => {
      const updatedElements = updateElementsWithNewNode({
        elements,
        orientation,
        targetEdgeId: edgeId,
      });

      console.log({ updatedElements });

      return updatedElements ?? elements;
    });
  };

  return {
    onDeleteNode: handleDeleteNode,
    onNodeClick: handleNodeClick,
    onAddNode: handleAddNodeByEdge,
    onUpdateNode: handleUpdateNode,
  };
};

export default useNodeActions;
