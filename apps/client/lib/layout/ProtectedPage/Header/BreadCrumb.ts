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
  },
};

const templateBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.TEMPLATES}`,
  label: 'Template Management',
};

const ticketsBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.TICKETS}`,
  label: 'Ticket Management',
};

const profileBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.PROFILE}`,
  label: 'Settings',
};

const reportBreadcrumb: BreadcrumbNode = {
  route: `/${ROUTES.REPORT}`,
  label: 'Reports & Analytics',
};

const breadcrumbMap: Record<string, BreadcrumbNode> = {
  [ROUTES.DASHBOARD]: dashboardBreadcrumb,
  [ROUTES.ASSETS]: assetsBreadcrumb,
  [ROUTES.MAINTENANCE]: maintenanceBreadcrumb,
  [ROUTES.TASKS]: tasksBreadcrumb,
  [ROUTES.TICKETS]: ticketsBreadcrumb,
  [ROUTES.PROFILE]: profileBreadcrumb,
  [ROUTES.REPORT]: reportBreadcrumb,
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
