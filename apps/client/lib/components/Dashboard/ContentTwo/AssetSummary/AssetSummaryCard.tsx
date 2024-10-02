import {
  ComponentWithAs,
  Flex,
  HStack,
  Icon,
  IconProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';

interface AssetSummaryCardProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  value: number;
  children: React.ReactNode;
}

const AssetSummaryCard = (props: AssetSummaryCardProps) => {
  const { title, icon, value, children } = props;
  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
    >
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <CardHeader>{title}</CardHeader>
        <Icon as={icon} boxSize="24px" />
      </HStack>
      <Text
        mt="8px"
        fontSize="24px"
        lineHeight="28.51px"
        fontWeight={800}
        color="primary.500"
      >
        {value.toLocaleString()}
      </Text>
      <Flex mt="16px">{children}</Flex>
    </VStack>
  );
};

export default AssetSummaryCard;
