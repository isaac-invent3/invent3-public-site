import { HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface SectionWrapperProps extends StackProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  sectionInfoWidth?: string;
}
const SectionWrapper = (props: SectionWrapperProps) => {
  const {
    title,
    subtitle,
    sectionInfoWidth = 'full',
    children,
    ...rest
  } = props;
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      justifyContent="space-between"
      {...rest}
    >
      <VStack alignItems="flex-start" spacing="8px" width={sectionInfoWidth}>
        <Text color="black" size="md">
          {title}
        </Text>
        <Text color="neutral.600" fontWeight={400}>
          {subtitle}
        </Text>
      </VStack>
      {children}
    </HStack>
  );
};

export default SectionWrapper;
