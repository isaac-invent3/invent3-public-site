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
  value?: number;
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
      headerStyle={{ maxW: '60%', size: 'md' }}
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
      additionalContent={
        <Text color="neutral.600" fontWeight={700} mb="4px">
          This month
        </Text>
      }
      isLoading={isLoading}
      count={value}
      formatValue={formatValue}
    />
  );
};

export default SummaryCard;
