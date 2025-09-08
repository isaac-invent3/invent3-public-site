import { HStack, Text, VStack } from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { Role } from '~/lib/interfaces/role.interfaces';
import { updateUserGroupRoleIds } from '~/lib/redux/slices/RoleSlice';

const SingleRole = ({ data }: { data: Role }) => {
  const { roleId, roleName, description } = data;
  const dispatch = useAppDispatch();
  const userGroupFormDetails = useAppSelector(
    (state) => state.role.userGroupFormDetails
  );

  return (
    <HStack
      width="full"
      justifyContent="space-between"
      cursor="pointer"
      bgColor="white"
      py="20px"
      px={{ base: '16px', lg: '32px' }}
    >
      <HStack
        spacing="16px"
        width={{ base: '90%', md: '60%' }}
        alignItems="flex-start"
      >
        <CheckBox
          isChecked={userGroupFormDetails.formUserGroupRoleIds.includes(roleId)}
          handleChange={() => {
            dispatch(updateUserGroupRoleIds(roleId));
          }}
        />
        <VStack
          spacing="8px"
          alignItems="flex-start"
          width={{ base: 'full', md: 'max-content' }}
        >
          <Text color="black" fontWeight={700}>
            {roleName}
          </Text>
        </VStack>
      </HStack>
      <HStack
        width={{ base: '10%', md: '40%' }}
        position="relative"
        justifyContent="flex-start"
      >
        <Text
          maxW="90%"
          textAlign="left"
          display={{ base: 'none', md: 'flex' }}
        >
          {description ?? 'N/A'}
        </Text>
      </HStack>
    </HStack>
  );
};

export default SingleRole;
