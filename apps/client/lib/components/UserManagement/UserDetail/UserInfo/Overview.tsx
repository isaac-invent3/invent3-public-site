import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const userData = useAppSelector((state) => state.user.user);

  if (!userData) {
    return null;
  }

  const {
    userId,
    email,
    phoneNumber,
    firstName,
    lastName,
    facilityName,
    lganame,
  } = userData;

  const userInfo1 = [
    {
      label: 'Employee ID',
      value: userId.toString(),
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
      value: 'Frontdesk/CSA',
    },
    {
      label: 'Job Title',
      value: 'Admin Officer',
    },
  ];
  const name = `${firstName} ${lastName}`;

  return (
    <HStack
      width="full"
      pt="24px"
      pb="19px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="40px"
      alignItems="flex-start"
    >
      <Avatar width="176px" height="176px" name={name} size="lg" />
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <HStack spacing="29px">
          <Heading
            as="h3"
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
          >
            {name}
          </Heading>
          <GenericStatusBox text="Active" colorCode="#07CC3B" />
        </HStack>
        <HStack
          width="full"
          spacing="32px"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <VStack alignItems="flex-start" spacing="8px">
            {userInfo1.map((info, index) => (
              <HStack spacing="16px" alignItems="flex-start" key={index}>
                <Text color="neutral.600" minW="90px" size="md">
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
                <Text color="neutral.600" minW="64px" size="md">
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
