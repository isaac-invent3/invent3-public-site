import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import React from 'react';
import { LongBackArrowIcon } from '../../CustomIcons';

interface BackButtonProps {
  handleClick: () => void;
  customStyles?: StackProps;
}
const BackButton = (props: BackButtonProps) => {
  const { handleClick, customStyles } = props;
  return (
    <HStack
      cursor="pointer"
      px="12px"
      rounded="8px"
      spacing="8px"
      bgColor="#F6F6F6"
      minW="85px"
      minH="32px"
      onClick={() => handleClick()}
      {...customStyles}
    >
      <Icon as={LongBackArrowIcon} boxSize="16px" color="#374957" />
      <Text color="primary.500">Back</Text>
    </HStack>
  );
};

export default BackButton;
