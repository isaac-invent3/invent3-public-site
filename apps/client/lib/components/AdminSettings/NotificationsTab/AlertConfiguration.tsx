import { Switch, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SectionWrapper from '../../UserSettings/Common/SectionWrapper';
import { useFormikContext } from 'formik';
import { Settings } from '~/lib/interfaces/settings.interfaces';

const NOTICATION_TYPE = [
  {
    title: 'Asset Maintenance Due',
    subtitle: 'Schedule service to avoid downtime',
    name: 'alertAssetMaintenanceDue',
  },
  {
    title: 'Compliance Violation',
    subtitle: 'Immediate action required for compliance',
    name: 'alertComplianceViolation',
  },
  {
    title: 'New User Added',
    subtitle: 'A new team member onboarded',
    name: 'alertNewUserAdded',
  },
  {
    title: 'Subscription Expiring Soon',
    subtitle: 'Renew now to avoid disruption',
    name: 'alertSubscriptionExpiresSoon',
  },
];
const AlertConfiguration = () => {
  const { setFieldValue, values } = useFormikContext<Settings>();
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Alert Configuration
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="16px">
        {NOTICATION_TYPE.map((item, index) => {
          return (
            <SectionWrapper
              title={item.title}
              subtitle={item.subtitle}
              sectionInfoWidth="212px"
              key={index}
            >
              <Switch
                size="sm"
                isChecked={
                  values[
                    item.name as
                      | 'alertComplianceViolation'
                      | 'alertNewUserAdded'
                      | 'alertComplianceViolation'
                      | 'alertSubscriptionExpiresSoon'
                  ]
                }
                onChange={() =>
                  setFieldValue(
                    item.name as
                      | 'alertComplianceViolation'
                      | 'alertNewUserAdded'
                      | 'alertComplianceViolation'
                      | 'alertSubscriptionExpiresSoon',
                    !values[
                      item.name as
                        | 'alertComplianceViolation'
                        | 'alertNewUserAdded'
                        | 'alertComplianceViolation'
                        | 'alertSubscriptionExpiresSoon'
                    ]
                  )
                }
              />
            </SectionWrapper>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default AlertConfiguration;
