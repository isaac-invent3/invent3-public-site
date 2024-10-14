import { Text, VStack } from '@chakra-ui/react';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

const Technician = (info: MaintenanceSchedule) => {
  return (
    <VStack alignItems="flex-start" spacing="4px">
      <Text color="black">{info.contactPerson}</Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
      >
        {info.contactPersonPhoneNo}
      </Text>
      <Text
        color="neutral.600"
        fontSize="10px"
        lineHeight="11.88px"
        fontWeight={400}
      >
        {info.contactPersonEmail}
      </Text>
    </VStack>
  );
};

export default Technician;
