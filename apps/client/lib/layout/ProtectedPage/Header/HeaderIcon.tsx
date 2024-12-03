import React from 'react';
import { ComponentWithAs, Flex, Icon, IconProps } from '@chakra-ui/react';

interface HeaderIconProps {
  icon: ComponentWithAs<'svg', IconProps>;
  size: string;
}

const HeaderIcon = React.forwardRef<HTMLDivElement, HeaderIconProps>(
  (props, ref) => {
    const { icon, size, ...rest } = props;
    return (
      <Flex
        ref={ref}
        width="40px"
        height="40px"
        rounded="full"
        bgColor="white"
        justifyContent="center"
        alignItems="center"
        flexShrink={0}
        cursor="pointer"
        {...rest}
      >
        <Icon as={icon} boxSize={size} color="neutral.600" />
      </Flex>
    );
  }
);

HeaderIcon.displayName = 'HeaderIcon';

export default HeaderIcon;
