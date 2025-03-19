import { ComponentWithAs, Flex, FlexProps, Icon, IconProps } from '@chakra-ui/react';
import React from 'react';

interface HeaderIconProps extends FlexProps {
  icon: ComponentWithAs<'svg', IconProps>;
  size: string;
  handleClick?: () => void;
  children?: React.ReactNode;
}

const HeaderIcon = React.forwardRef<HTMLDivElement, HeaderIconProps>(
  (props, ref) => {
    const { icon, size, handleClick, children, ...rest } = props;
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
        onClick={handleClick}
        {...rest}
      >
        <Icon as={icon} boxSize={size} color="neutral.600" />
        {children}
      </Flex>
    );
  }
);

HeaderIcon.displayName = 'HeaderIcon';

export default HeaderIcon;
