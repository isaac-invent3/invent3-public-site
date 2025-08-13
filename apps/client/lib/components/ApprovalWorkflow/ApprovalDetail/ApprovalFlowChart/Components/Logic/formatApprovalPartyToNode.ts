import { MarkerType } from '@xyflow/react';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { CustomEdge, CustomNode } from '../Interfaces';
import { createNewNode } from './updateApprovalFlowElements';
import { APPROVAL_ACTION } from '~/lib/utils/constants';

const createBaseNodesFromApprovalPartyInstance = (
  items: ApprovalWorkflowPartyInstance[]
): CustomNode[] => {
  const newNodes = items.map((item) => {
    return {
      id: item.approvalWorkFlowPartyInstanceId.toString(),
      data: {
        ...item,
        levelNumber: item.levelNumber ? item.levelNumber + 1 : 2,
      },
      position: { x: 0, y: 0 },
      draggable:
        item.approvalActionId === APPROVAL_ACTION.REQUESTED_THE_APPROVAL
          ? false
          : true,
    };
  });

  return newNodes;
};

const createBaseEdgesFromApprovalPartyInstance = (
  items: ApprovalWorkflowPartyInstance[]
) => {
  const instances = items.filter((el) => el.levelNumber != null);

  const levels = instances.reduce(
    (acc, instance) => {
      const level = instance.levelNumber + 1;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(instance);
      return acc;
    },
    {} as Record<number, ApprovalWorkflowPartyInstance[]>
  );

  const sortedLevels = Object.keys(levels)
    .map(Number)
    .sort((a, b) => a - b);

  const edges: CustomEdge[] = [];
  let joinerNodes: CustomNode[] = [];

  for (let i = 0; i < sortedLevels.length - 1; i++) {
    const currentLevel = sortedLevels[i];
    const nextLevel = sortedLevels[i + 1];

    if (!currentLevel || !nextLevel) continue;

    const currentInstances = levels[currentLevel];
    const nextInstances = levels[nextLevel];

    if (!currentInstances || !nextInstances) continue;

    // If both levels have more than one node, insert a joiner node
    if (currentInstances.length > 1 && nextInstances.length > 1) {
      const stackJoinerNode = createNewNode('stackJoiner');

      joinerNodes.push(stackJoinerNode);

      for (const currentInstance of currentInstances) {
        edges.push({
          id: `e${currentInstance.approvalWorkFlowPartyInstanceId}-${stackJoinerNode.id}`,
          source: currentInstance.approvalWorkFlowPartyInstanceId.toString(),
          target: stackJoinerNode.id,
        });
      }

      for (const nextInstance of nextInstances) {
        edges.push({
          id: `e${stackJoinerNode.id}-${nextInstance.approvalWorkFlowPartyInstanceId}`,
          source: stackJoinerNode.id,
          target: nextInstance.approvalWorkFlowPartyInstanceId.toString(),
        });
      }
    } else {
      for (const currentInstance of currentInstances) {
        for (const nextInstance of nextInstances) {
          edges.push({
            id: `e${currentInstance.approvalWorkFlowPartyInstanceId}-${nextInstance.approvalWorkFlowPartyInstanceId}`,
            source: currentInstance.approvalWorkFlowPartyInstanceId.toString(),
            target: nextInstance.approvalWorkFlowPartyInstanceId.toString(),
          });
        }
      }
    }
  }

  return { edges, joinerNodes };
};

const createNodeAndEdgesFromBaseElements = (
  instances: ApprovalWorkflowPartyInstance[]
) => {
  const { edges: baseEdges, joinerNodes } =
    createBaseEdgesFromApprovalPartyInstance(instances);
  const baseNodes = createBaseNodesFromApprovalPartyInstance(instances);

  const formattedNodes = baseNodes.map((x) => ({
    ...x,
    type: 'approvalNode',
  }));

  const nodes = [...joinerNodes, ...formattedNodes];

  const edges = baseEdges.map((x) => ({
    ...x,
    type: 'condition',
    sourceHandle: 'output',
    style: {
      stroke: '#656565',
      strokeWidth: 2,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#656565',
    },
  }));

  return {
    nodes,
    edges,
  };
};

export { createNodeAndEdgesFromBaseElements };
