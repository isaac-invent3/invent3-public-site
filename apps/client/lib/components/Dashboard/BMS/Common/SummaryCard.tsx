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
  additionalTitle?: string;
  subtitle?: string;
  value?: string | number | undefined;
  icon?: string;
  isLoading?: boolean;
  containerStyle?: StackProps;
  children?: React.ReactNode;
  rightSideElement?: React.ReactNode;
}
const SummaryCard = (props: SummaryCardProps) => {
  const {
    title,
    additionalTitle,
    subtitle,
    value,
    icon,
    isLoading,
    containerStyle,
    children,
    rightSideElement,
  } = props;
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
        <VStack alignItems="flex-start" spacing="4px">
          <Text color="neutral.800" fontWeight={800} size="md">
            {title}
          </Text>
          <Text color="neutral.600">{additionalTitle}</Text>
        </VStack>
        {rightSideElement ??
          (icon && (
            <Flex position="relative" width="24px" height="24px">
              <Image src={icon} alt="icon" fill />
            </Flex>
          ))}
      </HStack>
      {children ?? (
        <VStack alignItems="flex-start" spacing="8px">
          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight={800} size="xl">
              {value ?? '-'}
            </Text>
          </Skeleton>
          <Text color="neutral.600">{subtitle}</Text>
        </VStack>
      )}
    </VStack>
  );
};

export default SummaryCard;
