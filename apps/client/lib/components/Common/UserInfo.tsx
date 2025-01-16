import {
  Avatar,
  AvatarProps,
  Flex,
  HStack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';

interface UserInfoProps {
  name: string | null;
  avatar?: string;
  customAvatarStyle?: AvatarProps;
  customBoxStyle?: StackProps;
  children?: React.ReactNode;
  textStyle?: TextProps;
}
const UserInfo = (props: UserInfoProps) => {
  const { name, customBoxStyle, customAvatarStyle, children, textStyle } =
    props;

  return (
    <HStack spacing="8px" {...customBoxStyle}>
      <Avatar
        width="30px"
        height="30px"
        // name={name ?? ''}
        {...customAvatarStyle}
      />
      <Flex direction="column">
        <Text color="black" {...textStyle}>
          {name ?? 'N/A'}
        </Text>
        {children}
      </Flex>
    </HStack>
  );
};

export default UserInfo;
