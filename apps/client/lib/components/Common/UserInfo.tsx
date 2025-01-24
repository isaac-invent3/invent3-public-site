import {
  Avatar,
  AvatarProps,
  Flex,
  HStack,
  StackProps,
  Text,
} from '@chakra-ui/react';

interface UserInfoProps {
  name: string | null;
  role?: string;
  avatar?: string;
  customAvatarStyle?: AvatarProps;
  customBoxStyle?: StackProps;
  children?: React.ReactNode;
}
const UserInfo = (props: UserInfoProps) => {
  const { name, role, customBoxStyle, customAvatarStyle, children } = props;

  return (
    <HStack spacing="8px" {...customBoxStyle}>
      <Avatar
        size="sm"
        width="30px"
        height="30px"
        name={name ?? ''}
        {...customAvatarStyle}
      />
      <Flex direction="column">
        <Text color="black">{name ?? 'N/A'}</Text>
        {role && (
          <Text color="neutral.600" fontSize="10px" lineHeight="11.88px">
            {role}
          </Text>
        )}
        {children}
      </Flex>
    </HStack>
  );
};

export default UserInfo;
