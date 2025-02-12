import { Text as ChakraText, StackProps, VStack } from '@chakra-ui/react';

interface SectionInfoProps extends StackProps {
  title: string;
  info: string;
  isRequired: boolean;
  maxWidth?: string;
}

const SectionInfo = (props: SectionInfoProps) => {
  const { title, info, isRequired, maxWidth, ...rest } = props;
  return (
    <VStack
      alignItems="flex-start"
      spacing="8px"
      width="full"
      maxWidth={maxWidth ?? 'full'}
      flexShrink={0}
      {...rest}
    >
      <ChakraText size="md" fontWeight={700} color="primary">
        {title}
        {isRequired && (
          <ChakraText size="md" color="#FF3B30" as="span">
            *
          </ChakraText>
        )}
      </ChakraText>
      <ChakraText color="neutral.600">{info}</ChakraText>
    </VStack>
  );
};

export default SectionInfo;
