import { HStack, Icon, Text } from '@chakra-ui/react';
import { AddIcon } from '~/lib/components/CustomIcons';

interface AddButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  color?: string;
}
const AddButton = (props: AddButtonProps) => {
  const { children, handleClick, color = 'primary.500' } = props;

  return (
    <HStack spacing="4px" cursor="pointer" onClick={handleClick}>
      <Icon as={AddIcon} boxSize="18px" color={color} />
      <Text color={color} mt="3px">
        {children}
      </Text>
    </HStack>
  );
};

export default AddButton;
