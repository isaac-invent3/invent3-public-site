import {
  ComponentWithAs,
  HStack,
  IconProps,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import ProgressIndicator from '../../Common/ProgressIndicator';

interface SummaryCardProps {
  isLoading: boolean;
  value: number | undefined;
  title: string;
  percentChange?: number | undefined;
  icon: ComponentWithAs<'svg', IconProps>;
  children?: React.ReactNode;
  showRange?: boolean;
}
const SummaryCard = (props: SummaryCardProps) => {
  const {
    isLoading,
    value,
    percentChange,
    title,
    icon,
    children,
    showRange = true,
  } = props;
  return (
    <SummaryCardWrapper
      title={title}
      icon={icon}
      containerStyle={{ minH: '164px' }}
      headerStyle={{ maxW: '70%' }}
      iconStyle={{
        color: 'primary.500',
        boxSize: '16px',
        mr: '6px',
      }}
      iconWrapperStyle={{
        width: '32px',
        height: '32px',
        flexShrink: 0,
        rounded: 'full',
        bgColor: '#0F264233',
      }}
    >
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
      >
        <HStack alignItems="flex-end" spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <Text
              mt="8px"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
              color="primary.500"
            >
              {value?.toLocaleString() ?? '-'}
            </Text>
          </Skeleton>
          {showRange && (
            <Text color="neutral.600" fontWeight={700} mb="4px">
              This month
            </Text>
          )}
        </HStack>
        {percentChange && (
          <HStack spacing="4px">
            <Skeleton isLoaded={!isLoading}>
              <ProgressIndicator valueChange={percentChange ?? 0} />
            </Skeleton>
            <Text color="neutral.600" fontWeight={700}>
              Compared to last month
            </Text>
          </HStack>
        )}
        {children}
      </VStack>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
