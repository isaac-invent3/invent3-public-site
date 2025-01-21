import {
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardHeader from './CardHeader';

interface SummaryCardWrapperProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  children: React.ReactNode;
  containerStyle?: StackProps;
}

const SummaryCardWrapper = (props: SummaryCardWrapperProps) => {
  const { title, icon, children, containerStyle } = props;

  return (
    <VStack
      width="full"
      height="full"
      p="16px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
      {...containerStyle}
    >
      <HStack
        width="full"
        alignItems="flex-start"
        justifyContent="space-between"
        position="relative"
      >
        <CardHeader>{title}</CardHeader>
        <Icon as={icon} boxSize="24px" position="absolute" right={0} />
      </HStack>
      {children}
    </VStack>
  );
};

export default SummaryCardWrapper;
