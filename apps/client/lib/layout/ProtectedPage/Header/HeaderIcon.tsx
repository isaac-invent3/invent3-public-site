import { ComponentWithAs, Flex, Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

interface HeaderIconProps {
  icon: ComponentWithAs<'svg', IconProps>;
  size: string;
}
const HeaderIcon = (props: HeaderIconProps) => {
  const { icon, size } = props;
  return (
    <Flex
      width="40px"
      height="40px"
      rounded="full"
      bgColor="white"
      justifyContent="center"
      alignItems="center"
      flexShrink={0}
      cursor="pointer"
    >
      <Icon as={icon} boxSize={size} color="neutral.600" />
    </Flex>
  );
};

export default HeaderIcon;
