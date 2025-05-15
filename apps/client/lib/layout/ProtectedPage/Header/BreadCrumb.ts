import { ROUTES } from '~/lib/utils/constants';

interface breadCrumbRoute {
  label: string;
  route: string;
}

interface BreadcrumbNode {
  route?: string;
  label: string;
  children?: Record<string, BreadcrumbNode>;
}

const dashboardBreadcrumb: BreadcrumbNode = {
  route: '#',
  label: 'Overview',
};

const assetsBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.ASSETS}`,
  label: 'Asset Management',
  children: {
    edit: { label: 'Edit Asset' },
    add: { label: 'Add New Asset' },
    transfer: { label: 'Asset Transfer Request' },
    dispose: { label: 'Dispose Asset Request' },
    'bulk-dispose': { label: 'Bulk Dispose' },
    'bulk-transfer': { label: 'Bulk Transfer' },
  },
};

const maintenanceBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.MAINTENANCE}`,
  label: 'Maintenance',
  children: {
    schedules: {
      label: 'Schedules',
      route: `/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}`,
      children: {
        add: { label: 'Add New Maintenance Schedule' },
        instances: {
          label: 'Instance',
          children: {
            edit: { label: 'Edit Maintenance Schedule Instance' },
          },
        },
      },
    },
    plans: {
      label: 'Plans',
      route: `/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}`,
      children: {
        add: { label: 'Add New Maintenance Plan' },
        edit: { label: 'Edit Maintenance Plan' },
      },
    },
    history: {
      label: 'History',
      route: `/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}`,
    },
  },
};

const tasksBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.TASKS}`,
  label: 'Task Management',
  children: {
    add: { label: 'Add New Task' },
    'bulk-update': { label: 'Bulk Update' },
  },
};

const templateBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.TEMPLATES}`,
  label: 'Template Management',
  children: {
    detail: { label: 'Template Detail' },
  },
};

const ticketsBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.TICKETS}`,
  label: 'Ticket Management',
  children: {
    'bulk-update': { label: 'Bulk Update' },
  },
};

const profileBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.PROFILE}`,
  label: 'Profile',
};

// const userSettingsBreadcrumb: BreadcrumbNode = {
//   route: `/${ROUTES.USER_SETTINGS}`,
//   label: 'Settings',
// };

const reportBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.REPORT}`,
  label: 'Reports & Analytics',
};

const userManagementBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.USERS}`,
  label: 'User Management',
  children: {
    add: { label: 'Add User' },
    edit: { label: 'Edit User' },
  },
};

const auditLogBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.AUDIT_LOG}`,
  label: 'Audit Log',
};

const roleManagementBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.ROLES}`,
  label: 'Role Management',
  children: {
    detail: { label: 'Role Details' },
    group: { label: 'User Group' },
    role: { label: 'User Role' },
    add: { label: 'Add' },
  },
};

const vendorManagementBreadCrumb: BreadcrumbNode = {
  route: `/${ROUTES.VENDOR}`,
  label: 'Vendor Management',
  children: {
    edit: { label: 'Edit Vendor' },
    add: { label: 'Add New Vendor' },
  },
};

const companyManagementBreadCrumb: BreadcrumbNode = {
  route: `/${ROUTES.COMPANY}`,
  label: 'Company Management',
  children: {
    edit: { label: 'Edit Company' },
    add: { label: 'Add New Company' },
    details: { label: 'Company Details' },
    'data-upload': { label: 'Data Upload' },
  },
};

const complianceBreadCrumb: BreadcrumbNode = {
  route: `/${ROUTES.COMPLIANCE}`,
  label: 'Compliance',
};
const adminSettingsBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.USER_SETTINGS}`,
  label: 'Admin Settings',
};

const approvalBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.APPROVAL}`,
  label: 'Approval Workflow',
};

const breadcrumbMap: Record<string, BreadcrumbNode> = {
  [ROUTES.DASHBOARD]: dashboardBreadcrumb,
  [ROUTES.ASSETS]: assetsBreadcrumb,
  [ROUTES.MAINTENANCE]: maintenanceBreadcrumb,
  [ROUTES.TASKS]: tasksBreadcrumb,
  [ROUTES.TICKETS]: ticketsBreadcrumb,
  [ROUTES.PROFILE]: profileBreadcrumb,
  [ROUTES.REPORT]: reportBreadcrumb,
  [ROUTES.COMPANY]: companyManagementBreadCrumb,
  [ROUTES.APPROVAL]: approvalBreadcrumb,
  [ROUTES.COMPLIANCE]: complianceBreadCrumb,
  [ROUTES.SETTINGS]: adminSettingsBreadcrumb,
  [ROUTES.ROLES]: roleManagementBreadcrumb,
  [ROUTES.VENDOR]: vendorManagementBreadCrumb,
  [ROUTES.USERS]: userManagementBreadcrumb,
  [ROUTES.AUDIT_LOG]: auditLogBreadcrumb,
  [ROUTES.TEMPLATES]: templateBreadcrumb,
};

const getBreadcrumb = (pathSegments: string[]): breadCrumbRoute[] => {
  let currentMap = breadcrumbMap;
  const breadcrumbs: breadCrumbRoute[] = [
    { label: 'Dashboard', route: `/${ROUTES.DASHBOARD}` },
  ];

  for (const segment of pathSegments) {
    if (currentMap[segment]) {
      const node = currentMap[segment];
      breadcrumbs.push({
        label: node.label,
        route: node.route || '#',
      });

      // Traverse deeper if children exist
      if (node.children) {
        currentMap = node.children;
      }
    }
  }

  return breadcrumbs;
};

export { breadcrumbMap, getBreadcrumb };
