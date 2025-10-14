import {
  Heading,
  Text as ChakraText,
  VStack,
  StackProps,
  TextProps,
  HeadingProps,
} from '@chakra-ui/react';

interface ModalHeadingProps {
  heading: string;
  subheading?: string;
  customStyle?: StackProps;
  textStyle?: TextProps;
  headingStyle?: HeadingProps;
}
const ModalHeading = (props: ModalHeadingProps) => {
  const { heading, subheading, customStyle, textStyle, headingStyle } = props;

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px" {...customStyle}>
      <Heading
        fontWeight={800}
        size={{ base: 'lg', md: 'xl' }}
        color="primary.500"
        {...headingStyle}
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
