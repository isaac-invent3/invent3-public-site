import {
  Box,
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  Link,
  Text,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  isCollapse: boolean;
  count?: number;
}

const NavItem = (props: NavItemProps) => {
  const { name, route, icon, isCollapse, count } = props;

  const path = usePathname();
  const splittedPathname = path.split('/');
  return (
    <Link
      href={`/${route}`}
      textDecoration="none !important"
      width={isCollapse ? 'max-content' : 'full'}
      role="group"
      position="relative"
    >
      {count && (
        <Box
          bgColor="#17A1FA"
          border="1px solid #0E2642"
          borderRadius="100%"
          width="18px"
          height="18px"
          position="absolute"
          right={isCollapse ? 0.5 : 1}
          top={isCollapse ? 0.5 : 1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            as="span"
            color="#42403D"
            fontWeight={700}
            fontSize="10px"
            lineHeight="11.88px"
          >
            {count}
          </Text>
        </Box>
      )}

      <HStack
        rounded="8px"
        bgColor={splittedPathname[1] === route ? '#6E7D8E80' : 'none'}
        spacing="16px"
        py="12px"
        px={isCollapse ? '12px' : '8px'}
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
            size="md"
            fontWeight={splittedPathname[1] === route ? 700 : 500}
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
