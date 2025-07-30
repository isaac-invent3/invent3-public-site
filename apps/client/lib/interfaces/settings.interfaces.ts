import { BaseEntity } from '@repo/interfaces';

interface Settings extends BaseEntity {
  settingId: number;
  companyId: number;
  languageId: number;
  automaticTimeZoneId: boolean;
  dateFormatId: number;
  twoFactorAuthentication: boolean;
  sessionDurationTimeoutId: number;
  maxFailedAttempts: number;
  minPasswordLengthId: number;
  specialCharactersRequired: boolean;
  passwordExpiryPeriodId: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsnotifications: boolean;
  alertAssetMaintenanceDue: boolean;
  alertComplianceViolation: boolean;
  alertNewUserAdded: boolean;
  alertSubscriptionExpiresSoon: boolean;
  enableAuditLogs: boolean;
  retentionPeriodId: number;
  logsIncludeUserActivity: boolean;
  exportLogsAutoEnabled: boolean;
  exportFrequencyId: number;
  exportFormatId: number;
  iso27001: boolean;
  gdpr: boolean;
  soc2: boolean;
  hippa: boolean;
  pciDss: boolean;
  complianceReviewFrequencyId: number;
  complianceEnableAutoChecks: boolean;
  complianceRequireDocumentationOfStatusChange: boolean;
  complianceRequireDocumentExpiryAlerts: boolean;
  complianceViolationAlerts: boolean;
  complianceEscalationRulesId: number;
  complianceAutoSuspendViolatingPartner: boolean;
  complianceEnableAudits: boolean;
  complianceAuditRetentionPeriodId: number;
  complianceAutoReportScheduleId: number;
  dateCreated: string;
  whatsappNotifications: boolean;
  maxDormantPeriod: string;
  passwordExpirationEnabled: boolean;
}

interface UpdateSettingsPayload {
  companyId?: number;
  languageId?: number;
  automaticTimeZoneId?: boolean;
  dateFormatId?: number;
  twoFactorAuthentication?: boolean;
  sessionDurationTimeoutId?: number;
  maxFailedAttempts?: number;
  minPasswordLengthId?: number;
  specialCharactersRequired?: boolean;
  passwordExpiryPeriodId?: number;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsnotifications?: boolean;
  alertAssetMaintenanceDue?: boolean;
  alertComplianceViolation?: boolean;
  alertNewUserAdded?: boolean;
  alertSubscriptionExpiresSoon?: boolean;
  enableAuditLogs?: boolean;
  retentionPeriodId?: number;
  logsIncludeUserActivity?: boolean;
  exportLogsAutoEnabled?: boolean;
  exportFrequencyId?: number;
  exportFormatId?: number;
  iso27001?: boolean;
  gdpr?: boolean;
  soc2?: boolean;
  hippa?: boolean;
  pciDss?: boolean;
  complianceReviewFrequencyId?: number;
  complianceEnableAutoChecks?: boolean;
  complianceRequireDocumentationOfStatusChange?: boolean;
  complianceRequireDocumentExpiryAlerts?: boolean;
  complianceViolationAlerts?: boolean;
  complianceEscalationRulesId?: number;
  complianceAutoSuspendViolatingPartner?: boolean;
  complianceEnableAudits?: boolean;
  complianceAuditRetentionPeriodId?: number;
  complianceAutoReportScheduleId?: number;
  lastModifiedBy: string;
}

[
  {
    facilityId: 0,
    bmsBuildingSettingsModel: [
      {
        buildingId: 0,
        costOfEnergyPerKWh: 0,
        budgetExpenditureModels: [
          {
            key: 1,
            value: {
              systemContextTypeId: 0,
              contextId: 0,
              kWhTarget: 0,
              baselineSource: 'string',
              durationId: 1,
              baselineEnergySource: 0,
              startDate: '2025-05-23T12:49:49.547Z',
            },
          },
        ],
        bmsFloorSettingsModels: [
          {
            floorMap: 'string',
            floorId: 0,
            bmsRoomSettingsModel: [
              {
                roomId: 0,
                temperatureSetPoint: {
                  key: 1,
                  value: {
                    key: 0,
                    value: 0,
                  },
                },
                humiditySetPoint: {
                  key: 1,
                  value: {
                    key: 0,
                    value: 0,
                  },
                },
                co2SetPoint: {
                  key: 1,
                  value: {
                    key: 0,
                    value: 0,
                  },
                },
                energyConsumptionTarget: {
                  key: 1,
                  value: {
                    key: 0,
                    value: 0,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    createdBy: 'string',
  },
];

interface BMSData {
  facilityId: number;
  bmsBuildingSettingsModel: BmsBuildingSettingsModel[];
  createdBy: string;
}

export interface BmsBuildingSettingsModel {
  buildingId: number | null;
  costOfEnergyPerKWh: number | null;
  budgetExpenditureModels: BudgetExpenditureModel[];
  bmsFloorSettingsModels: BmsFloorSettingsModel[];
}

export interface BmsFloorSettingsModel {
  floorMap: string | null;
  floorId: number | null;
  bmsRoomSettingsModel: BmsRoomSettingsModel[];
}

export interface BmsRoomSettingsModel {
  roomId: number | null;
  temperatureSetPoint: Co2SetPoint;
  humiditySetPoint: Co2SetPoint;
  lightningLevelSetPoint: Co2SetPoint;
  co2SetPoint: Co2SetPoint;
  energyConsumptionTarget: Co2SetPoint;
}

export interface Co2SetPoint {
  key: number | null;
  value: Co2SetPointValue;
}

export interface Co2SetPointValue {
  key: number | null;
  value: number | null;
}

export interface BudgetExpenditureModel {
  key: number;
  value: BudgetExpenditureModelValue;
}

export interface BudgetExpenditureModelValue {
  systemContextTypeId: number | null;
  contextId: number | null;
  kWhTarget: number | null;
}

interface BuildingSetting {
  buildingId: number;
  costOfEnergyPerKWh: number;
  budgetExpenditureModels: BudgetExpenditure[];
  floorSettingsIds: number[];
}

export interface BudgetExpenditure {
  systemContextTypeId: number;
  contextId: number;
  kWhTarget: number;
  baselineSource: number;
  durationId: number;
  baselineEnergySource: number;
  startDate: Date;
}

interface FloorSetting {
  floor: Floor;
  roomIds: number[];
}

export interface Floor {
  floorId: number;
  buildingId: number;
  floorName: string;
  floorRef: string;
  imageBasePrefix: string;
  floorPlanImage: string;
  isNew: boolean;
  createdDate: Date;
  createdBy: null;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: null;
  deletedBy: null;
  guid: string;
}

interface RoomSetting {
  temperature: number;
  humidity: number;
  co2: number;
  energyConsumption: number;
  lightningLevel: number;
}

interface ContactPayload {
  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  contactRequestType: number;
}

export type {
  Settings,
  UpdateSettingsPayload,
  BMSData,
  BuildingSetting,
  FloorSetting,
  RoomSetting,
  ContactPayload,
};
