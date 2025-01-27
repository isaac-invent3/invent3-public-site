import { Edge, Node } from '@xyflow/react';
import { Dispatch, SetStateAction } from 'react';
interface Position {
  x: number;
  y: number;
}

interface NodeStyle {
  width?: number;
  height?: number;
}

// eslint-disable-next-line no-unused-vars
type NodeCallback = (id: string) => void;

type ApprovalStatus = 'completed' | 'pending' | 'not-started';

type IndividualApproveeInfo = {
  approveeType: 'individual';
  approveeId: number;
  approveeName: string;
  approveeRole: string;
};

type GroupApproveeInfo = {
  approveeType: 'group';
  approveeId: number;
  approveeGroupName: string;
};

type ApproveeInfo = IndividualApproveeInfo | GroupApproveeInfo;

type CustomNodeData = ApproveeInfo & {
  actionStatus: ApprovalStatus;
  actionId: number;
  actionName: string;
  date?: string;
};

interface CustomNode extends Node {
  id: string;
  type?: string;
  data: Partial<CustomNodeData>;
  position: Position;
  style?: NodeStyle;
  target_position?: string;
  source_position?: string;
  height?: number;
  mergeNodeOfParentId?: string;
}

interface CustomEdge extends Edge {
  id: string;
  source: string;
  target: string;
}

type ApprovalFlowElement = CustomNode | CustomEdge;

interface ContextValue {
  elements: ApprovalFlowElement[];
  setElements: Dispatch<SetStateAction<ApprovalFlowElement[]>>;
}

export type {
  ApprovalFlowElement,
  ContextValue,
  CustomEdge,
  CustomNode,
  CustomNodeData,
  NodeCallback,
};
