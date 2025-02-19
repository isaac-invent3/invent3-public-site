import { Avatar, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const userData = useAppSelector((state) => state.user.user);

  if (!userData) {
    return null;
  }

  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    facilityName,
    lganame,
    userRoles,
    employeeId,
  } = userData;

  const userInfo1 = [
    {
      label: 'Employee ID',
      value: employeeId ? employeeId.toString() : null,
    },
    {
      label: 'Email',
      value: email,
    },
    {
      label: 'Phone Number',
      value: phoneNumber,
    },
    {
      label: 'Branch',
      value: [facilityName, lganame].filter(Boolean).join(',') ?? null,
    },
  ];

  const userInfo2 = [
    {
      label: 'User Role',
      value: userRoles?.map((item) => item.roleName).join(', '),
    },
    {
      label: 'Job Title',
      value: 'Admin Officer',
    },
  ];
  const name = `${firstName} ${lastName}`;

  return (
    <Stack
      width="full"
      direction={{ base: 'column', sm: 'row' }}
      pt={{ base: '18px', md: '24px' }}
      pb="19px"
      px={{ base: '16px', md: '32px' }}
      bgColor="#B4BFCA4D"
      spacing={{ base: '16px', md: '40px' }}
      alignItems="flex-start"
    >
      <Avatar
        width={{ base: '75px', lg: '176px' }}
        height={{ base: '75px', lg: '176px' }}
        name={name}
        size={{ base: 'lg', lg: '2xl' }}
      />
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <HStack spacing="29px">
          <Heading as="h3" size={{ base: 'lg', md: 'xl' }} fontWeight={800}>
            {name}
          </Heading>
          <GenericStatusBox text="Active" colorCode="#07CC3B" />
        </HStack>
        <Stack
          width="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '8px', md: '32px' }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <VStack alignItems="flex-start" spacing="8px">
            {userInfo1.map((info, index) => (
              <HStack spacing="16px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" minW="95px" size="md">
                  {info.label}:
                </Text>
                <Text color="black" size="md">
                  {isEmpty(info.value) ? 'N/A' : info.value}
                </Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            {userInfo2.map((info, index) => (
              <HStack spacing="16px" alignItems="flex-start" key={index}>
                <Text
                  color="neutral.600"
                  minW={{ base: '95px', md: '64px' }}
                  size="md"
                >
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
    </Stack>
  );
};

export default Overview;
