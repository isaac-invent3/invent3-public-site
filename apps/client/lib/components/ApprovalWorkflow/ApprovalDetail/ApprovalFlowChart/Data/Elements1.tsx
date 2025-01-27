import { ApprovalFlowInitialElement, Edge, Node } from '../Context/interfaces';

const position = { x: 0, y: 0 };

const nodes: Node[] = [
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
      actionStatus: 'pending',
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
      actionStatus: 'completed',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
      onAddNodeCallback: () => console.log('Add callback triggered'),
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
      onAddNodeCallback: () => console.log('Add callback triggered'),
    },
    position,
  },
  {
    id: '6',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'completed',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
      onAddNodeCallback: () => console.log('Add callback triggered'),
    },
    position,
  },
  {
    id: '7',
    data: {
      approveeType: 'group',
      approveeId: 202,
      approveeGroupName: 'HR Department',
      actionStatus: 'completed',
      actionId: 4,
      actionName: 'Policy Update Review',
      date: '2024-12-20',
      onAddNodeCallback: () => console.log('Add callback triggered'),
    },
    position,
  },
];

const edges: Edge[] = [
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

export const initialElements: ApprovalFlowInitialElement[] = [
  ...nodes,
  ...edges,
];
