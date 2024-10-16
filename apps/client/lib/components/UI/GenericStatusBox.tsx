import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

interface GenericStatusBoxProps {
  colorCode?: string;
  text: string;
}
const GenericStatusBox = (props: GenericStatusBoxProps) => {
  const { colorCode = '#8595A5', text } = props;
  return (
    <HStack
      padding="6px"
      borderWidth="1px"
      borderColor={`${colorCode}80`}
      bgColor={`${colorCode}0D`}
      rounded="6px"
      spacing="8px"
      maxW="max-content"
    >
      <Box width="8px" height="8px" rounded="full" bgColor={colorCode} />
      <Text color="black" textTransform="capitalize">
        {text}
      </Text>
    </HStack>
  );
};

export default GenericStatusBox;
