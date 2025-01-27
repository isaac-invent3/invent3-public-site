import { Position } from '@xyflow/react';
import dagre from 'dagre';
import _ from 'lodash';
import { isNode } from 'react-flow-renderer';
import { ApprovalFlowInitialElement, Edge } from '../Context/interfaces';

const nodeWidth = 250;
const nodeHeight = 180;

const getLayoutedElements = (_elements: ApprovalFlowInitialElement[]) => {
  const elements = _.cloneDeep(_elements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: el.width || nodeWidth,
        height: el.height || nodeHeight,
      });
    } else {
      const edge = el as Edge;
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      console.log(el);
      const nodeWithPosition = dagreGraph.node(el.id);

      el.targetPosition = Position.Left;
      el.sourcePosition = Position.Right;

      el.position = {
        x: nodeWithPosition?.x - (el.width || nodeWidth) / 2,

        y:
          nodeWithPosition?.y -
          (((el.height || nodeHeight) / 2) * Math.random()) / 1000,
      };
    }
    return el;
  });
};

export { getLayoutedElements };
