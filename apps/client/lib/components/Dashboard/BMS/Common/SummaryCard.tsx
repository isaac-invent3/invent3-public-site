import {
  Flex,
  HStack,
  Skeleton,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  icon: string;
  isLoading: boolean;
  containerStyle?: StackProps;
}
const SummaryCard = (props: SummaryCardProps) => {
  const { title, subtitle, value, icon, isLoading, containerStyle } = props;
  return (
    <VStack
      width="full"
      spacing="16px"
      alignItems="flex-start"
      rounded="8px"
      bgColor="neutral.200"
      p="16px"
      {...containerStyle}
    >
      <HStack width="full" justifyContent="space-between" spacing="24px">
        <Text color="neutral.800" fontWeight={800} size="md">
          {title}
        </Text>
        <Flex position="relative" width="24px" height="24px">
          <Image src={icon} alt="icon" fill />
        </Flex>
      </HStack>
      <VStack alignItems="flex-start" spacing="8px">
        <Skeleton isLoaded={!isLoading}>
          <Text fontWeight={800} size="xl">
            {value}
          </Text>
        </Skeleton>
        <Text color="neutral.600">{subtitle}</Text>
      </VStack>
    </VStack>
  );
};

export default SummaryCard;
