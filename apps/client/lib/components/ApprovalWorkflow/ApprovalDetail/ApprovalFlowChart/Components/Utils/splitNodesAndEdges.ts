import { ApprovalFlowInitialElement, Edge, Node } from '../Context/interfaces';

const splitNodesAndEdges = (elements: ApprovalFlowInitialElement[]) => {
  const nodes = elements.filter((x): x is Node => 'position' in x);

  const edges = elements.filter(
    (x): x is Edge => 'source' in x && 'target' in x
  );

  return {
    edges,
    nodes,
  };
};

export { splitNodesAndEdges };
