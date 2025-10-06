import {
  ComponentWithAs,
  HeadingProps,
  HStack,
  Icon,
  IconProps,
  Skeleton,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Dashboard/Common/CardHeader';

interface SummaryCardWrapperProps {
  title: string;
  icon?: ComponentWithAs<'svg', IconProps>;
  children?: React.ReactNode;
  containerStyle?: StackProps;
  iconStyle?: IconProps;
  headerStyle?: HeadingProps;
  iconWrapperStyle?: StackProps;
  isLoading?: boolean;
  count?: number | string;
  additionalContent?: React.ReactNode;
  formatValue?: boolean;
  customCountStyle?: TextProps;
  subContainerStyle?: StackProps;
}

const SummaryCardWrapper = (props: SummaryCardWrapperProps) => {
  const {
    title,
    icon,
    children,
    containerStyle,
    headerStyle,
    iconStyle,
    iconWrapperStyle,
    isLoading,
    count,
    additionalContent,
    formatValue = true,
    customCountStyle,
    subContainerStyle,
  } = props;

  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
      spacing={0}
      {...containerStyle}
      sx={{
        scrollbarWidth: '0px',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          width: '0px',
          height: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
        },
      }}
    >
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
        position="relative"
      >
        <CardHeader
          customStyle={{
            ...headerStyle,
            color: 'neutral.600',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '100%',
          }}
        >
          {title}
        </CardHeader>
        {icon && (
          <HStack width="24px" height="24px" p={0} m={0} {...iconWrapperStyle}>
            <Icon
              as={icon}
              boxSize="24px"
              position="absolute"
              right={0}
              {...iconStyle}
            />
          </HStack>
        )}
      </HStack>
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
        {...subContainerStyle}
      >
        <HStack alignItems="flex-end" spacing="4px">
          <Skeleton
            isLoaded={!isLoading}
            minW={isLoading ? '50px' : 'min-content'}
            minH={isLoading ? '20px' : 'min-content'}
          >
            <Text
              mt="8px"
              fontSize={{ base: '24px', lg: '40px' }}
              lineHeight="100%"
              fontWeight={800}
              color="primary.500"
              {...customCountStyle}
            >
              {count !== undefined || count !== 0 || count !== null
                ? formatValue && typeof count === 'number'
                  ? count?.toLocaleString()
                  : count
                : '-'}
            </Text>
          </Skeleton>
          {additionalContent}
        </HStack>
      </VStack>
      {children}
    </VStack>
  );
};

export default SummaryCardWrapper;
