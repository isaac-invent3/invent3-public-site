import {
  Avatar,
  AvatarGroup,
  HStack,
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
    <HStack
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
      <HStack spacing="32px">
        <InfoWrapper label="Modules" minW="126px">
          <Text color="white" fontWeight={700} size="lg">
            05
          </Text>
        </InfoWrapper>
        <InfoWrapper label="Accounts" minW="126px">
          <AvatarGroup size="sm" max={4}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </InfoWrapper>
        <InfoWrapper label="Status" minW="126px">
          <GenericStatusBox
            text="Active"
            color="#07CC3B"
            textStyles={{ color: 'white' }}
          />
        </InfoWrapper>
      </HStack>
    </HStack>
  );
};

export default RoleInfo;
