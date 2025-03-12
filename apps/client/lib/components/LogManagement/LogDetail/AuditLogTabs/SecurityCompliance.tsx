import { HStack, VStack } from '@chakra-ui/react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

import { useAppSelector } from '~/lib/redux/hooks';

const SecurityCompliance = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);

  if (!logData) {
    return null;
  }

  const infoOne = [
    {
      label: 'Compliance Level:',
      value: 'ISO 27001, SOC 2',
    },
    {
      label: 'Escalation Status:',
      value: 'No security risk detected',
    },
  ];

  return (
    <HStack
      width="full"
      p="16px"
      borderWidth="0.7px"
      borderColor="#BBBBBBB2"
      rounded="8px"
      spacing="64px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" spacing="16px">
        {infoOne.map((item) => (
          <Detail {...item} key={item.label} labelMinWidth="111px" />
        ))}
      </VStack>
      <Detail
        label="Approval Workflow:"
        value="Admin Approved (Req ID: APR-20240625-0034)"
        labelMinWidth="123px"
      />
    </HStack>
  );
};

export default SecurityCompliance;
