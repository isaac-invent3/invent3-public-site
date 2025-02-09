import {
  ComponentWithAs,
  HStack,
  IconProps,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../Common/SummaryCardWrapper';

interface SummaryCardProps {
  isLoading: boolean;
  value: number | string | React.ReactElement | undefined;
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;

  formatValue?: boolean;
}
const SummaryCard = (props: SummaryCardProps) => {
  const { isLoading, value, title, icon, formatValue } = props;
  return (
    <SummaryCardWrapper
      title={title}
      icon={icon}
      containerStyle={{ minH: '120px' }}
      headerStyle={{ maxW: '60%', size:'md' }}
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
              {(formatValue ? value?.toLocaleString() : value) ?? '-'}
            </Text>
          </Skeleton>
        </HStack>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
