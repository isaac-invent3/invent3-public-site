import { MarkerType } from '@xyflow/react';
import { ApprovalWorkflowPartyInstance } from '~/lib/interfaces/approvalWorkflow.interfaces';
import { CustomEdge, CustomNode } from '../Interfaces';

const createBaseNodesFromApprovalPartyInstance = (
  items: ApprovalWorkflowPartyInstance[]
): CustomNode[] => {
  const instances = items.filter((el) => el.levelNumber);

  const newNodes = instances.map((item) => {
    return {
      id: item.approvalWorkFlowPartyInstanceId.toString(),
      data: item,
      position: { x: 0, y: 0 },
    };
  });

  return newNodes;
};

const createBaseEdgesFromApprovalPartyInstance = (
  items: ApprovalWorkflowPartyInstance[]
) => {
  const instances = items.filter((el) => el.levelNumber);

  const levels = instances.reduce(
    (acc, instance) => {
      const level = instance.levelNumber;
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

  for (let i = 0; i < sortedLevels.length - 1; i++) {
    const currentLevel = sortedLevels[i];
    const nextLevel = sortedLevels[i + 1];

    if (!currentLevel || !nextLevel) continue;

    const currentInstances = levels[currentLevel];
    const nextInstances = levels[nextLevel];

    if (!currentInstances || !nextInstances) continue;

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

  return edges;
};

const createNodeAndEdgesFromBaseElements = (
  instances: ApprovalWorkflowPartyInstance[]
) => {
  const baseEdges = createBaseEdgesFromApprovalPartyInstance(instances);
  const baseNodes = createBaseNodesFromApprovalPartyInstance(instances);

  const nodes = baseNodes.map((x) => ({
    ...x,
    type: 'approvalNode',
  }));

  const edges = baseEdges.map((x) => ({
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

  return {
    nodes,
    edges,
  };
};

export { createNodeAndEdgesFromBaseElements };
