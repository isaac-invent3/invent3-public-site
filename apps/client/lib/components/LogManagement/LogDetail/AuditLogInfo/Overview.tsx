import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);

  if (!logData) {
    return null;
  }

  const logInfo1 = [
    {
      label: 'Time Stamp',
      value: 'June 25, 2024, 14:37:22 UTC',
    },
    {
      label: 'IP Address',
      value: '192.168.1.24',
    },
    {
      label: 'Device/Browser Info',
      value: 'Chrome 120.1, Windows 10',
    },
  ];

  const logInfo2 = [
    {
      label: 'Performed By',
      value: 'John Doe (Admin)',
    },
    {
      label: 'User Email',
      value: 'johndoe@invent3.com',
    },
    {
      label: 'User Email',
      value: 'Super Admin',
    },
  ];

  return (
    <HStack
      width="full"
      pt="24px"
      pb="59px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="40px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" width="full" spacing="15px">
        <Heading as="h3" fontSize="32px" lineHeight="38.02px" fontWeight={800}>
          Action: Update Vendor Details
        </Heading>
        <HStack width="full" spacing="59px" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="16px">
            {logInfo1.map((info, index) => (
              <HStack spacing="8px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" minW="131px" size="md">
                  {info.label}:
                </Text>
                <Text color="black" size="md">
                  {isEmpty(info.value) ? 'N/A' : info.value}
                </Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="16px">
            {logInfo2.map((info, index) => (
              <HStack spacing="8px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" minW="9px" size="md">
                  {info.label}:
                </Text>
                <Text color="black" size="md">
                  {isEmpty(info.value) ? 'N/A' : info.value}
                </Text>
              </HStack>
            ))}
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;
