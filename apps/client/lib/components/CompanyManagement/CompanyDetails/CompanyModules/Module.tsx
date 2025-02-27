import {
  ComponentWithAs,
  Flex,
  Icon,
  IconProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface ModuleProps {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  description: string;
}
const Module = (props: ModuleProps) => {
  const { name, route, icon, description } = props;

  return (
    <Link href={`/company-management/${route}`}>
      <VStack
        width="full"
        alignItems="flex-start"
        spacing="16px"
        p="16px"
        bgColor="#EEEEEE"
        rounded="8px"
      >
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <Flex
            width="32px"
            height="32px"
            bgColor="primary.500"
            rounded="full"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize="18px" color="white" />
          </Flex>
          <Text size="lg" color="primary.500">
            {name}
          </Text>
        </VStack>
        <Text color="neutral.700" fontWeight={400}>
          {description}
        </Text>
      </VStack>
    </Link>
  );
};

export default Module;
