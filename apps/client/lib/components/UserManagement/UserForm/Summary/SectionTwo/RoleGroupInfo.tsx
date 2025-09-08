import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const RoleGroupInfo = () => {
  const { userRoleNames, userGroupNames, teamNames } = useAppSelector(
    (state) => state.user.userForm
  );

  return (
    <VStack width="full" spacing="15px">
      <DetailHeader variant="primary">Occupation Info</DetailHeader>
      <SimpleGrid width="full" gap="29px">
        <VStack width="full" spacing="4px" alignItems="flex-start">
          <Text color="neutral.600">User Role</Text>
          <HStack wrap="wrap" spacing="8px">
            {userRoleNames?.length > 0 ? (
              userRoleNames?.map((item, index) => (
                <Text
                  key={index}
                  size="md"
                  color="black"
                  bgColor="#E6E6E6"
                  py="8px"
                  px="12px"
                  rounded="16px"
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text size="md">N/A</Text>
            )}
          </HStack>
        </VStack>

        <VStack width="full" spacing="4px" alignItems="flex-start">
          <Text color="neutral.600">User Group</Text>
          <HStack wrap="wrap" spacing="8px">
            {userGroupNames?.length > 0 ? (
              userGroupNames?.map((item, index) => (
                <Text
                  key={index}
                  size="md"
                  color="black"
                  bgColor="#E6E6E6"
                  py="8px"
                  px="12px"
                  rounded="16px"
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text size="md">N/A</Text>
            )}
          </HStack>
        </VStack>

        <VStack width="full" spacing="4px" alignItems="flex-start">
          <Text color="neutral.600">Teams</Text>
          <HStack wrap="wrap" spacing="8px">
            {teamNames?.length > 0 ? (
              teamNames?.map((item, index) => (
                <Text
                  key={index}
                  size="md"
                  color="black"
                  bgColor="#E6E6E6"
                  py="8px"
                  px="12px"
                  rounded="16px"
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text size="md">N/A</Text>
            )}
          </HStack>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};

export default RoleGroupInfo;
