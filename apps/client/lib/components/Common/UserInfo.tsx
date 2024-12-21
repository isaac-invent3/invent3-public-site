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
  avatar?: string;
  customAvatarStyle?: AvatarProps;
  customBoxStyle?: StackProps;
  children?: React.ReactNode;
}
const UserInfo = (props: UserInfoProps) => {
  const { name, customBoxStyle, customAvatarStyle, children } = props;

  return (
    <HStack spacing="8px" {...customBoxStyle}>
      <Avatar
        width="30px"
        height="30px"
        // name={name ?? ''}
        {...customAvatarStyle}
      />
      <Flex direction="column">
        <Text color="black">{name ?? 'N/A'}</Text>
        {children}
      </Flex>
    </HStack>
  );
};

export default UserInfo;
