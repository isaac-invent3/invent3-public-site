import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import React from 'react';
import { DowntrendIcon, UptrendIcon } from '../../CustomIcons';

interface ProgressIndicatorProps {
  valueChange: number;
  customStyles?: StackProps;
}
const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { valueChange, customStyles } = props;
  return (
    <HStack
      py="4px"
      px="8px"
      spacing="8px"
      rounded="full"
      bgColor={valueChange < 0 ? '#BA00001A' : '#00A1291A'}
      {...customStyles}
    >
      <Icon
        as={valueChange < 0 ? DowntrendIcon : UptrendIcon}
        boxSize="18px"
        color={valueChange < 0 ? '#BA0000' : '#00A129'}
      />
      <Text color={valueChange < 0 ? '#BA0000' : '#00A129'}>
        {valueChange < 0 && '-'}
        {valueChange > 0 && '+'}
        {valueChange < 0
          ? (valueChange * -1)?.toFixed(2)
          : valueChange?.toFixed(2)}
        %
      </Text>
    </HStack>
  );
};

export default ProgressIndicator;
