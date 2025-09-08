import {
  ComponentWithAs,
  HStack,
  IconProps,
  ResponsiveValue,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import ProgressIndicator from '../ProgressIndicator';

interface SummaryCardProps {
  isLoading: boolean;
  value?: number | string;
  title: string;
  percentChange?: number | undefined;
  icon: ComponentWithAs<'svg', IconProps>;
  children?: React.ReactNode;
  showRange?: boolean;
  rangeText?: string;
  progressText?: string;
  formatValue?: boolean;
  showIconBgColor?: boolean;
  textSize?: ResponsiveValue<string>;
  iconStyle?: IconProps | undefined;
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
    rangeText,
    progressText,
    formatValue,
    showIconBgColor,
    textSize,
    iconStyle,
  } = props;
  return (
    <SummaryCardWrapper
      title={title}
      icon={icon}
      containerStyle={{ minH: '180px' }}
      headerStyle={{
        maxW: '70%',
        size: textSize ?? { base: 'base', sm: 'base' },
      }}
      iconStyle={{
        color: 'primary.500',
        boxSize: '20px',
        mr: '6px',
        ...iconStyle,
      }}
      iconWrapperStyle={{
        flexShrink: 0,
        rounded: 'full',
        bgColor: showIconBgColor ? '#0F264233' : 'none',
      }}
      additionalContent={
        showRange && (
          <Text color="neutral.600" fontWeight={700} mb="4px">
            {rangeText ?? 'This month'}
          </Text>
        )
      }
      formatValue={formatValue}
      count={value}
    >
      {percentChange && (
        <HStack spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <ProgressIndicator valueChange={percentChange ?? 0} />
          </Skeleton>
          <Text color="neutral.600" fontWeight={700}>
            {progressText ?? 'Compared to last month'}
          </Text>
        </HStack>
      )}
      {children}
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
