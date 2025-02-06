import { Heading, Text as ChakraText, VStack } from '@chakra-ui/react';

interface ModalHeadingProps {
  heading: string;
  subheading?: string;
}
const ModalHeading = (props: ModalHeadingProps) => {
  const { heading, subheading } = props;

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Heading
        fontWeight={800}
        fontSize={{ base: '24px', lg: '32px' }}
        lineHeight={{ base: '28.51px', lg: '38.02px' }}
        color="primary.500"
      >
        {heading}
      </Heading>
      <ChakraText size="md" fontWeight={400} color="neutral.600">
        {subheading}
      </ChakraText>
    </VStack>
  );
};

export default ModalHeading;
