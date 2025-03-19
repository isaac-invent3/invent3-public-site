import { ApprovalFlowElement, CustomEdge, CustomNode } from '../Interfaces';

const splitNodesAndEdges = (elements: ApprovalFlowElement[]) => {
  const nodes = elements.filter((x): x is CustomNode => 'position' in x);

  const edges = elements.filter(
    (x): x is CustomEdge => 'source' in x && 'target' in x
  );

  return {
    edges,
    nodes,
  };
};

export { splitNodesAndEdges };
