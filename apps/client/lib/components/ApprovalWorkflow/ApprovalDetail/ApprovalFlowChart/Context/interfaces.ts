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

interface Stats {
  started?: number;
  running?: number;
  error?: number;
  completed?: number;
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
  onDeleteNodeCallback?: NodeCallback;
  onNodeClickCallback?: NodeCallback;

  // eslint-disable-next-line no-unused-vars
  onAddNodeCallback?: (
    id: string,
    orientation: 'vertical' | 'horizontal'
  ) => void;
};

interface CustomNode extends Node {
  id: string;
  type?: string;
  data: CustomNodeData;
  position: Position;
  style?: NodeStyle;
  target_position?: string;
  source_position?: string;
  height?: number;
  mergeNodeOfParentId?: string;
}

interface EdgeData extends Record<string, unknown> {
  title?: string;
  disabled?: boolean;
  isAddButtonHidden?: boolean;
  mergeNodeOfParentId?: string;
  onAddNodeCallback?: NodeCallback;
}

interface CustomEdge extends Edge {
  id: string;
  source: string;
  target: string;
  data?: EdgeData;
}

type ApprovalFlowInitialElement = Node | Edge;

interface ContextValue {
  elements: ApprovalFlowInitialElement[];
  setElements: Dispatch<SetStateAction<ApprovalFlowInitialElement[]>>;
  onAddNodeCallback: () => void;
}

export type {
  ApprovalFlowInitialElement,
  ContextValue,
  CustomEdge,
  CustomNode,
  NodeCallback,
  CustomNodeData,
};
