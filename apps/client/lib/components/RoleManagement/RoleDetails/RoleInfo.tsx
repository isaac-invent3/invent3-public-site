import {
  Avatar,
  AvatarGroup,
  HStack,
  Stack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Role } from '~/lib/interfaces/role.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface InfoWrapperProps extends StackProps {
  label: string;
  children: React.ReactNode;
}

const InfoWrapper = ({ label, children, ...rest }: InfoWrapperProps) => {
  return (
    <VStack spacing="8px" alignItems="flex-start" {...rest}>
      <Text color="neutral.300">{label}</Text>
      {children}
    </VStack>
  );
};

interface RoleInfoProps {
  role: Role;
}

const RoleInfo = ({ role }: RoleInfoProps) => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      width="full"
      p="16px"
      justifyContent="space-between"
      bgColor="primary.500"
    >
      <InfoWrapper label="Role">
        <Text color="white" fontWeight={700} size="lg">
          {role.roleName}
        </Text>
      </InfoWrapper>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '16px', lg: '32px' }}
      >
        <HStack
          spacing={{ base: '16px', lg: '32px' }}
          width={{ base: 'full', lg: 'max-content' }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <InfoWrapper label="Modules" minW="126px">
            <Text color="white" fontWeight={700} size="lg">
              {role.noOfAssignedSystemModuleContextTypes}
            </Text>
          </InfoWrapper>
          <InfoWrapper label="Accounts" minW="126px">
            <AvatarGroup size="sm" max={4}>
              {Array(role.noOfAssociatedUsers)
                .fill('')
                .map((_, index) => (
                  <Avatar name="" src="" key={index} />
                ))}
            </AvatarGroup>
          </InfoWrapper>
        </HStack>
        <InfoWrapper label="Status" minW="126px">
          <GenericStatusBox
            text={role.currentStatusName}
            color={role.currentStatusDisplayColorCode}
            textStyles={{ color: 'white' }}
          />
        </InfoWrapper>
      </Stack>
    </Stack>
  );
};

export default RoleInfo;
