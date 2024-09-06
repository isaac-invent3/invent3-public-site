import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

interface AssetStatusProps {
  color: string;
  label: string;
}
const AssetStatus = (props: AssetStatusProps) => {
  const { color, label } = props;
  return (
    <HStack
      padding="6px"
      border="1px solid #BBBBBB80"
      rounded="6px"
      spacing="8px"
    >
      <Box width="8px" height="8px" rounded="full" bgColor={color} />
      <Text color="black">{label}</Text>
    </HStack>
  );
};

export default AssetStatus;
