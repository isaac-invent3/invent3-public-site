import { Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const Overview = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);

  if (!logData) {
    return null;
  }

  const logInfo1 = [
    {
      label: 'Time Stamp',
      // value: 'June 25, 2024, 14:37:22 UTC',
      value: dateFormatter(logData?.dateCreated, 'MMMM DD, YYYY, HH:mm:ss UTC'),
    },
    {
      label: 'IP Address',
      value: 'N/A',
    },
    {
      label: 'Device/Browser Info',
      value: 'N/A',
    },
  ];

  const logInfo2 = [
    {
      label: 'Performed By',
      value: logData?.username,
    },
    {
      label: 'User Email',
      value: logData?.email,
    },
    {
      label: 'User Role',
      value: logData?.userRoles,
    },
  ];

  return (
    <HStack
      width="full"
      pt="24px"
      pb={{ base: '24px', lg: '59px' }}
      px={{ base: '16px', lg: '32px' }}
      bgColor="#B4BFCA4D"
      spacing="40px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" width="full" spacing="15px">
        <Heading as="h3" size={{ base: 'lg', md: 'xl' }} fontWeight={800}>
          Action: {logData?.requestActionTypeName}{' '}
          {logData?.systemContextTypeName}
        </Heading>
        <Stack
          width="full"
          spacing={{ base: '16px', md: '59px' }}
          alignItems="flex-start"
          direction={{ base: 'column', md: 'row' }}
        >
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
        </Stack>
      </VStack>
    </HStack>
  );
};

export default Overview;
