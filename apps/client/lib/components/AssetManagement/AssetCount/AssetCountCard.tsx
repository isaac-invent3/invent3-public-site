'use client';

import { IconProps } from '@chakra-ui/icons';
import {
  Box,
  ComponentWithAs,
  Flex,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';

interface AssetCountCardProps {
  data: {
    title: string;
    value: string;
    icon: ComponentWithAs<'svg', IconProps>;
  };
}
const AssetCountCard = (props: AssetCountCardProps) => {
  const { data } = props;

  return (
    <Box
      bg="gray.100"
      borderRadius="16px"
      height="224px"
      boxShadow="md"
      textAlign="center"
      bgColor="#EBEBEB"
      overflow="hidden"
      cursor="pointer"
      transition="all 300ms ease-in-out"
      _hover={{
        transform: 'translateY(-10px)',
        boxShadow: 'lg',
      }}
    >
      <VStack
        w="full"
        h="70%"
        alignItems="center"
        justifyContent="center"
        gap="1em"
      >
        <Flex w="64px" h="64px" alignItems="center" justifyContent="center">
          <Icon as={data.icon} boxSize="64px" />
        </Flex>

        <Text fontSize="lg" fontWeight={800} color="neutral.800">
          {data.title}
        </Text>
      </VStack>

      <VStack
        w="full"
        h="30%"
        bgColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl" fontWeight={800} color="primary.500">
          {data.value}
        </Text>
      </VStack>
    </Box>
  );
};

export default AssetCountCard;
