import { Stack, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface SectionWrapperProps extends StackProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  sectionInfoWidth?: string;
  sectionInfoStyle?: StackProps;
}
const SectionWrapper = (props: SectionWrapperProps) => {
  const {
    title,
    subtitle,
    sectionInfoWidth = 'full',
    children,
    sectionInfoStyle,
    ...rest
  } = props;
  return (
    <Stack
      width="full"
      alignItems="flex-start"
      justifyContent="space-between"
      direction="row"
      spacing={0}
      {...rest}
    >
      <VStack
        alignItems="flex-start"
        spacing="8px"
        width="full"
        maxW={sectionInfoWidth}
        {...sectionInfoStyle}
      >
        <Text color="black" size="md">
          {title}
        </Text>
        <Text color="neutral.600" fontWeight={400}>
          {subtitle}
        </Text>
      </VStack>
      {children}
    </Stack>
  );
};

export default SectionWrapper;
