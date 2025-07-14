import {
  Heading,
  Text as ChakraText,
  VStack,
  StackProps,
  TextProps,
} from '@chakra-ui/react';

interface ModalHeadingProps {
  heading: string;
  subheading?: string;
  customStyle?: StackProps;
  textStyle?: TextProps;
}
const ModalHeading = (props: ModalHeadingProps) => {
  const { heading, subheading, customStyle, textStyle } = props;

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px" {...customStyle}>
      <Heading
        fontWeight={800}
        size={{ base: 'lg', md: 'xl' }}
        color="primary.500"
      >
        {heading}
      </Heading>
      <ChakraText size="md" fontWeight={400} color="neutral.600" {...textStyle}>
        {subheading}
      </ChakraText>
    </VStack>
  );
};

export default ModalHeading;
