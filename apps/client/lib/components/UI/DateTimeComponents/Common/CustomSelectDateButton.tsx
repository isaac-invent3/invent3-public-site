import { HStack, Icon, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

interface CustomSelectDateButtonProps {
  initialDate?: string;
  isDisabled?: boolean;
  customStyle?: { [name: string]: unknown };
}
const CustomSelectDateButton = (props: CustomSelectDateButtonProps) => {
  const { initialDate, isDisabled = false, customStyle } = props;
  const today = moment().format('MMM DD, YYYY');

  return (
    <HStack
      width="full"
      py="10px"
      px="8px"
      rounded="8px"
      justifyContent="space-between"
      bgColor="#F7F7F7"
      {...customStyle}
      opacity={isDisabled ? 0.3 : 1}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
    >
      <Text color="primary.500">{initialDate ?? today}</Text>
      <Icon as={ChevronDownIcon} boxSize="16px" />
    </HStack>
  );
};

export default CustomSelectDateButton;
