import { Box, HStack, Text, StackProps } from '@chakra-ui/react';

interface GenericStatusBoxProps extends StackProps {
  colorCode?: string;
  text: string;
}
const GenericStatusBox = (props: GenericStatusBoxProps) => {
  const { colorCode = '#8595A5', text, ...rest } = props;
  return (
    <HStack
      padding="6px"
      borderWidth="1px"
      borderColor={`${colorCode}80`}
      bgColor={`${colorCode}0D`}
      rounded="6px"
      spacing="8px"
      width="max-content"
      {...rest}
    >
      <Box
        width="8px"
        height="8px"
        rounded="full"
        bgColor={colorCode}
        flexShrink={0}
      />
      <Text color="black" textTransform="capitalize">
        {text}
      </Text>
    </HStack>
  );
};

export default GenericStatusBox;
