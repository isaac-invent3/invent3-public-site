import { Avatar, Flex, HStack, Text } from '@chakra-ui/react';

interface UserInfoProps {
  name: string | null;
  avatar?: string;
  customAvatarStyle?: { [name: string]: unknown };
  customBoxStyle?: { [name: string]: unknown };
  children?: React.ReactNode;
}
const UserInfo = (props: UserInfoProps) => {
  const { name, avatar, customBoxStyle, customAvatarStyle, children } = props;

  return (
    <HStack spacing="8px" {...customBoxStyle}>
      <Avatar width="30px" height="30px" src={avatar} {...customAvatarStyle} />
      <Flex direction="column">
        <Text color="black">{name ?? 'N/A'}</Text>
        {children}
      </Flex>
    </HStack>
  );
};

export default UserInfo;
