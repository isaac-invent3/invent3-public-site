import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { TemplateIcon } from '~/lib/components/CustomIcons';

interface TemplateButtonProps {
  children: React.ReactNode;
  customStyle?: { [name: string]: unknown };
  handleClick: () => void;
}
const TemplateButton = (props: TemplateButtonProps) => {
  const { children, customStyle, handleClick } = props;

  return (
    <HStack
      spacing="16px"
      bgColor="#0366EF1A"
      rounded="8px"
      p="12px"
      {...customStyle}
      cursor="pointer"
      onClick={() => handleClick()}
      width="max-content"
    >
      <Icon as={TemplateIcon} boxSize="20px" color="#004BB3" />
      <Text size="md" color="#004BB3">
        {children}
      </Text>
    </HStack>
  );
};

export default TemplateButton;
