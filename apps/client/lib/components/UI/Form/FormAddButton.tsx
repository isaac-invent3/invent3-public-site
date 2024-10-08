import { HStack, Icon, Text } from '@chakra-ui/react';
import { AddIcon } from '~/lib/components/CustomIcons';

interface AddButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}
const AddButton = (props: AddButtonProps) => {
  const { children, handleClick } = props;

  return (
    <HStack spacing="4px" cursor="pointer" onClick={handleClick}>
      <Icon as={AddIcon} boxSize="18px" color="primary.main" />
      <Text color="primary.main" mt="3px">
        {children}
      </Text>
    </HStack>
  );
};

export default AddButton;
