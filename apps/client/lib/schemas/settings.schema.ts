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

const bmsSettingsSchema = Yup.object().shape({
  bmsBuildingSettingsModel: Yup.array()
    .of(
      Yup.object().shape({
        buildingId: Yup.number().required('Building is Required'),
        costOfEnergyPerKWh: Yup.number().required('Cost of Energy Per KWh'),
        budgetExpenditureModels: Yup.array().of(
          Yup.object().shape({
            key: Yup.number().required('Key is Required'),
            value: Yup.object().shape({
              systemContextTypeId: Yup.number().required(
                'System Context Type is Required'
              ),
              contextId: Yup.number().required('Context ID is Required'),
              kWhTarget: Yup.number().required('Target kWh is Required'),
            }),
          })
        ),
        bmsFloorSettingsModels: Yup.array().of(
          Yup.object().shape({
            floorId: Yup.number().required('Floor ID is Required'),
            floorMap: Yup.string().nullable(),
            bmsRoomSettingsModel: Yup.array().of(
              Yup.object().shape({
                roomId: Yup.number().required('Room is Required'),
                temperatureSetPoint: Yup.object().shape({
                  key: Yup.number().required('Key is Required'),
                  value: Yup.object().shape({
                    key: Yup.number().required('Key is Required'),
                    value: Yup.number().required('Value is Required'),
                  }),
                }),
                humiditySetPoint: Yup.object()
                  .shape({
                    key: Yup.number().required('Key is Required'),
                    value: Yup.object().shape({
                      key: Yup.number().required('Key is Required'),
                      value: Yup.number().required('Value is Required'),
                    }),
                  })
                  .required('Humidity SetPoint is Required'),
                lightningLevelSetPoint: Yup.object()
                  .shape({
                    key: Yup.number().required('Key is Required'),
                    value: Yup.object().shape({
                      key: Yup.number().required('Key is Required'),
                      value: Yup.number().required('Value is Required'),
                    }),
                  })
                  .required('Lightning Level SetPoint is Required'),
                co2SetPoint: Yup.object().shape({
                  key: Yup.number().required('Key is Required'),
                  value: Yup.object().shape({
                    key: Yup.number().required('Key is Required'),
                    value: Yup.number().required('Value is Required'),
                  }),
                }),
                energyConsumptionTarget: Yup.object().shape({
                  key: Yup.number().required('Key is Required'),
                  value: Yup.object().shape({
                    key: Yup.number().required('Key is Required'),
                    value: Yup.number().required('Value is Required'),
                  }),
                }),
              })
            ),
          })
        ),
      })
    )
    .required('Building Settings is Required')
    .min(1, 'At least one building setting is required'),
  facilityId: Yup.number().required('Facility is Required'),
});

const createApprovalWorkflowSchema = Yup.object().shape({
  levels: Yup.array()
    .of(
      Yup.object().shape({
        levelNumber: Yup.number().required('Building is Required'),
        approvers: Yup.array()
          .of(
            Yup.object().shape({
              userId: Yup.number().required('User is Required'),
              userFullName: Yup.string().nullable(),
              approvalActionId: Yup.number().required(
                'Approval Action is Required'
              ),
              approvalActionName: Yup.string().required(
                'Approval Name is Required'
              ),
              partyId: Yup.number().nullable(),
            })
          )
          .min(1, 'At least one approver is required'),
      })
    )
    .required('Level is Required')
    .min(1, 'At least one level is required'),
  approvalTypeId: Yup.number().required('Approval Type is Required'),
  approvalLevel: Yup.number().required('Approval Level is Required'),
  deletedParties: Yup.array().of(
    Yup.object().shape({
      partyId: Yup.number().required('Party is Required'),
      levelNumber: Yup.number().required('Level number is Required'),
    })
  ),
});

const apiKeySchema = Yup.object().shape({
  companyApiKeyName: Yup.string().required('Name is Required'),
  usageLimit: Yup.number().required('Usage Limit is Required'),
  statusId: Yup.number().nullable(),
});

const webhookSchema = Yup.object().shape({
  webhookUrlName: Yup.string().required('Name is Required'),
  event: Yup.string().required('Event is Required'),
  secret: Yup.string().nullable(),
  authKey: Yup.string().nullable(),
});

export {
  generalSchema,
  notificationSchema,
  securityAuthenticationSchema,
  auditLogSchema,
  complianceSchema,
  bmsSettingsSchema,
  createApprovalWorkflowSchema,
  apiKeySchema,
  webhookSchema,
};
