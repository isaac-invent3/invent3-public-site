import { ComponentWithAs, Flex, Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

interface HeaderIconProps {
  icon: ComponentWithAs<'svg', IconProps>;
  size: string;
  handleClick?: () => void;
}
const HeaderIcon = (props: HeaderIconProps) => {
  const { icon, size, handleClick } = props;
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
      onClick={() => handleClick && handleClick()}
    >
      <Icon as={icon} boxSize={size} color="neutral.600" />
    </Flex>
  );
};

export default HeaderIcon;
