import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { AssetStatusType } from '~/lib/interfaces/asset.interfaces';
import { AssetColorCode } from '~/lib/utils/ColorCodes';

interface AssetStatusProps {
  status: AssetStatusType;
}
const AssetStatus = (props: AssetStatusProps) => {
  const { status } = props;
  const colorCode = AssetColorCode?.[status] ?? '#8595A5';
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
      <Text color="black">{status}</Text>
    </HStack>
  );
};

export default AssetStatus;
