import {
  ApprovalFlowElement,
  CustomEdge,
  CustomNode,
} from './Interfaces';

const position = { x: 0, y: 0 };

const nodes: CustomNode[] = [
  {
    id: '1',
    data: {
      approveeType: 'individual',
      approveeId: 101,
      approveeName: 'Alice Johnson',
      approveeRole: 'Manager',
      actionStatus: 'completed',
      actionId: 1,
      actionName: 'Budget Approval',
      date: '2025-01-01',
    },
    position,
  },
  {
    id: '2',
    data: {
      approveeType: 'group',
      approveeId: 201,
      approveeGroupName: 'Finance Team',
      actionStatus: 'completed',
      actionId: 2,
      actionName: 'Expense Report Review',
      date: '2025-01-15',
    },
    position,
  },

  {
    id: '4',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'pending',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
    },
    position,
  },
  {
    id: '5',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'completed',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
    },
    position,
  },
  {
    id: '6',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'pending',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
    },
    position,
  },
  {
    id: '7',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'not-started',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
    },
    position,
  },
];

const edges: CustomEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },

  {
    id: 'e2-3',
    source: '1',
    target: '4',
  },
  {
    id: 'e3-4df',
    source: '2',
    target: '5',
  },

  {
    id: 'e3-4sd',
    source: '4',
    target: '5',
  },
  {
    id: 'e3-487',
    source: '5',
    target: '6',
  },
  {
    id: 'e3-44587',
    source: '6',
    target: '7',
  },
];

export const initialElements: ApprovalFlowElement[] = [...nodes, ...edges];
