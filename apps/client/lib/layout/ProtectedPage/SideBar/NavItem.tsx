import {
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  Text,
  Link,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItemProps {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  isCollapse: boolean;
}

const NavItem = (props: NavItemProps) => {
  const { name, route, icon, isCollapse } = props;

  const path = usePathname();
  const splittedPathname = path.split('/');
  return (
    <Link
      href={`/${route}`}
      textDecoration="none !important"
      width={isCollapse ? 'max-content' : 'full'}
      role="group"
    >
      <HStack
        rounded="8px"
        bgColor={splittedPathname[1] === route ? '#6E7D8E80' : 'none'}
        spacing="16px"
        py="12px"
        px="8px"
        width={isCollapse ? 'max-content' : 'full'}
        _groupHover={{
          bgColor: '#6E7D8E80',
        }}
      >
        <Icon
          as={icon}
          boxSize="16px"
          color={splittedPathname[1] === route ? 'white' : 'neutral.600'}
          _groupHover={{ color: 'white' }}
        />
        {!isCollapse && (
          <Text
            color={splittedPathname[1] === route ? 'white' : 'neutral.600'}
            fontWeight={splittedPathname[1] === route ? 700 : 500}
            fontSize="14px"
            lineHeight="16.63px"
            whiteSpace="nowrap"
            _groupHover={{ color: 'white', fontWeight: 700 }}
          >
            {name}
          </Text>
        )}
      </HStack>
    </Link>
  );
};

export default NavItem;
