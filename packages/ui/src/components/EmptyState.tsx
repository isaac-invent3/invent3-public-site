import {
  VStack,
  Text as ChakraText,
  StackProps,
  TextProps,
} from '@chakra-ui/react';

interface EmptyStateProps {
  emptyText?: string;
  containerStyle?: StackProps;
  textStyle?: TextProps;
}
const EmptyState = ({
  emptyText,
  containerStyle,
  textStyle,
}: EmptyStateProps) => {
  return (
    <VStack width="full" {...containerStyle}>
      <ChakraText
        color="neutral.600"
        size="md"
        fontStyle="italic"
        width="full"
        textAlign="center"
        my={8}
        {...textStyle}
      >
        {emptyText ?? 'No Data Found'}
      </ChakraText>
    </VStack>
  );
};

export default EmptyState;
