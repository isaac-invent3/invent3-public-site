import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';

const mockPlan: MaintenancePlan = {
  rowId: 3,
  assetId: 7,
  assetName: 'Laptop',
  countryId: 1,
  stateId: 1,
  maintenancePlanId: 1,
  planName: 'Quarterly HVAC Check',
  scheduleId: 1,
  scheduledDate: '2024-11-25T00:00:00',
  completionDate: null,
  durationInHours: 4.5,
  comments: 'This is just a random comment',
  ticketId: null,
  assignedTo: null,
  statusId: 1,
  currentStatus: 'Completed',
  contactPerson: 'John Doe',
  contactPersonPhoneNo: '+1 555-123-4567',
  contactPersonEmail: 'johndoe@techsolutions.com',
  maintenanceType: 'Preventive Maintenance',
  createdBy: null,
  totalCost: 19500.0,
};

export default mockPlan;
