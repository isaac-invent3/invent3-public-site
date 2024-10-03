import {
  ComponentWithAs,
  Flex,
  HStack,
  Icon,
  IconProps,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import { useAppSelector } from '~/lib/redux/hooks';

interface AssetSummaryCardProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  value: number | undefined;
  children: React.ReactNode;
}

const AssetSummaryCard = (props: AssetSummaryCardProps) => {
  const { title, icon, value, children } = props;
  const { isLoading } = useAppSelector((state) => state.dashboard.info);
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
      <Skeleton isLoaded={!isLoading} minW="50px">
        <Text
          mt="8px"
          fontSize="24px"
          lineHeight="28.51px"
          fontWeight={800}
          color="primary.500"
        >
          {value !== undefined ? value.toLocaleString() : '-'}
        </Text>
      </Skeleton>
      <Flex mt="16px">{children}</Flex>
    </VStack>
  );
};

export default AssetSummaryCard;
