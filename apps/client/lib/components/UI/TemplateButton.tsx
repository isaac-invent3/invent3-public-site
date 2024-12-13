import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';

import { TemplateIcon } from '~/lib/components/CustomIcons';

interface TemplateButtonProps extends StackProps {
  children: React.ReactNode;
  handleClick: () => void;
}
const TemplateButton = (props: TemplateButtonProps) => {
  const { children, handleClick, ...rest } = props;

  return (
    <HStack
      spacing="8px"
      bgColor="#0366EF1A"
      rounded="8px"
      p="12px"
      cursor="pointer"
      onClick={() => handleClick()}
      {...rest}
    >
      <Icon as={TemplateIcon} boxSize="16px" color="#004BB3" />
      <Text color="#004BB3">{children}</Text>
    </HStack>
  );
};

export default TemplateButton;
