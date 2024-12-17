import { Text as ChakraText, VStack } from '@chakra-ui/react';

interface SectionInfoProps {
  title: string;
  info: string;
  isRequired: boolean;
  maxWidth?: string;
}

const SectionInfo = (props: SectionInfoProps) => {
  const { title, info, isRequired, maxWidth } = props;
  return (
    <VStack
      alignItems="flex-start"
      spacing="8px"
      width="full"
      maxWidth={maxWidth ?? 'full'}
      flexShrink={0}
    >
      <ChakraText size="md" fontWeight={700} color="primary">
        {title}
        {isRequired && (
          <ChakraText size="md" color="#FF3B30" as="span">
            *
          </ChakraText>
        )}
      </ChakraText>
      <ChakraText color="neutral.600" maxW="90%">
        {info}
      </ChakraText>
    </VStack>
  );
};

export default SectionInfo;
