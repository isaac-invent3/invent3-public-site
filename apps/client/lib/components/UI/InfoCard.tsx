import { InfoIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';

interface InfoCardProps {
  infoText: string;
  customStyle?: { [name: string]: unknown };
}
const InfoCard = (props: InfoCardProps) => {
  const { infoText, customStyle } = props;
  return (
    <HStack
      py="8px"
      px="16px"
      rounded="8px"
      bgColor="#0366EF0D"
      spacing="16px"
      alignItems="flex-start"
      width="max-content"
      {...customStyle}
    >
      <Icon as={InfoIcon} boxSize="16px" color="#0366EF" />
      <Text color="#0366EF" mt="2px">
        {infoText}
      </Text>
    </HStack>
  );
};

export default InfoCard;
