import { Box, HStack, Text } from '@chakra-ui/react';

interface GenericStatusBoxProps {
  colorCode?: string;
  text: string;
  width?: string;
}
const GenericStatusBox = (props: GenericStatusBoxProps) => {
  const { colorCode = '#8595A5', text, width } = props;
  return (
    <HStack
      padding="6px"
      borderWidth="1px"
      borderColor={`${colorCode}80`}
      bgColor={`${colorCode}0D`}
      rounded="6px"
      spacing="8px"
      maxW="max-content"
      {...(width && {
        width,
      })}
    >
      <Box width="8px" height="8px" rounded="full" bgColor={colorCode} />
      <Text color="black" textTransform="capitalize">
        {text}
      </Text>
    </HStack>
  );
};

export default GenericStatusBox;
