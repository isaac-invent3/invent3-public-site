import * as Yup from 'yup';

const generalSchema = Yup.object().shape({
  languageId: Yup.number().nullable(),
  automaticTimeZoneId: Yup.boolean().nullable(),
  dateFormatId: Yup.number().nullable(),
});

const notificationSchema = Yup.object().shape({
  emailNotifications: Yup.boolean().nullable(),
  pushNotifications: Yup.boolean().nullable(),
  smsnotifications: Yup.boolean().nullable(),
  alertAssetMaintenanceDue: Yup.boolean().nullable(),
  alertComplianceViolation: Yup.boolean().nullable(),
  alertNewUserAdded: Yup.boolean().nullable(),
  alertSubscriptionExpiresSoon: Yup.boolean().nullable(),
});

const securityAuthenticationSchema = Yup.object().shape({
  twoFactorAuthentication: Yup.boolean().nullable(),
  sessionDurationTimeoutId: Yup.number().nullable(),
  maxFailedAttempts: Yup.number().nullable(),
  minPasswordLengthId: Yup.number().nullable(),
  specialCharactersRequired: Yup.boolean().nullable(),
  passwordExpiryPeriodId: Yup.number().nullable(),
});

const auditLogSchema = Yup.object().shape({
  enableAuditLogs: Yup.boolean().nullable(),
  retentionPeriodId: Yup.number().nullable(),
  logsIncludeUserActivity: Yup.boolean().nullable(),
  exportLogsAutoEnabled: Yup.boolean().nullable(),
  exportFrequencyId: Yup.number().nullable(),
  exportFormatId: Yup.number().nullable(),
});

const complianceSchema = Yup.object().shape({
  iso27001: Yup.boolean().nullable(),
  gdpr: Yup.boolean().nullable(),
  soc2: Yup.boolean().nullable(),
  hippa: Yup.boolean().nullable(),
  pciDss: Yup.boolean().nullable(),
  complianceReviewFrequencyId: Yup.number().nullable(),
  complianceEnableAutoChecks: Yup.boolean().nullable(),
  complianceRequireDocumentationOfStatusChange: Yup.boolean().nullable(),
  complianceRequireDocumentExpiryAlerts: Yup.boolean().nullable(),
  complianceViolationAlerts: Yup.boolean().nullable(),
  complianceEscalationRulesId: Yup.number().nullable(),
  complianceAutoSuspendViolatingPartner: Yup.boolean().nullable(),
  complianceEnableAudits: Yup.boolean().nullable(),
  complianceAuditRetentionPeriodId: Yup.number().nullable(),
  complianceAutoReportScheduleId: Yup.number().nullable(),
});

export {
  generalSchema,
  notificationSchema,
  securityAuthenticationSchema,
  auditLogSchema,
  complianceSchema,
};
