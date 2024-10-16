const MaintenanceColorCode = {
  Completed: '#07CC3B',
  'On Hold': '#FF7A37',
  Cancelled: '#F50000',
  'In Progress': '#0366EF',
  'Not Started': '#8595A5',
};

const AssetColorCode = {
  Active: '#07CC3B',
  Inactive: '#EABC30',
  'Under Maintenance': '#8595A5',
  Decommissioned: '#4D55BB',
  'Pending Disposal': '#FF7A37',
  'In Storage': '#7E7000',
  Operational: '#0366EF',
  'Non-Operational': '#8595A5',
  'Scheduled for Maintenance': '#8D35F1',
  'Out of Service': '#F50000',
};

const TaskPriorityColorCode = {
  Critical: '#07CC3B',
  High: '#FF7A37',
  Cancelled: '#F50000',
  Low: '#0366EF',
  Medium: '#8595A5',
  Urgent: '#8D35F1',
};

export { MaintenanceColorCode, AssetColorCode, TaskPriorityColorCode };
