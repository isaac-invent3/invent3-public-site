import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { DowntrendIcon, UptrendIcon } from '~/lib/components/CustomIcons';

interface InfoProps {
  value: number;
  valueChange: number;
}
const Info = (props: InfoProps) => {
  const { value, valueChange } = props;
  return (
    <HStack width="full" justifyContent="space-between" alignItems="flex-start">
      <HStack spacing="8px">
        <Text
          fontSize="24px"
          lineHeight="28.51px"
          fontWeight={800}
          color="primary"
        >
          ₦{value.toLocaleString()}
        </Text>
        <HStack
          py="4px"
          px="8px"
          spacing="8px"
          rounded="full"
          bgColor={valueChange < 0 ? '#BA00001A' : '#00A1291A'}
        >
          <Icon
            as={valueChange < 0 ? DowntrendIcon : UptrendIcon}
            boxSize="18px"
            color={valueChange < 0 ? '#BA0000' : '#00A129'}
          />
          <Text color={valueChange < 0 ? '#BA0000' : '#00A129'}>
            {valueChange < 0 && '-'}
            {valueChange > 0 && '+'}
            {valueChange}%
          </Text>
        </HStack>
      </HStack>
      <VStack alignItems="flex-start" spacing="4px" mt="10px">
        <HStack spacing="16px">
          <Box width="30px" height="0px" borderBottom="3px solid #8D35F1" />
          <Text fontWeight={700} color="neutral.800">
            Actual
          </Text>
        </HStack>
        <HStack spacing="16px">
          <Box width="30px" height="0px" borderBottom="3px dashed #FF7A37" />
          <Text fontWeight={700} color="neutral.800">
            Projected
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Info;
