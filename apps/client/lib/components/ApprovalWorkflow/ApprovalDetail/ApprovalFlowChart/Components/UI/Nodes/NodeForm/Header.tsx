import { HStack, Icon, Text } from '@chakra-ui/react';
import { CloseIcon } from '~/lib/components/CustomIcons';

interface HeaderProps {
  type: 'edit' | 'add';
  onClose: () => void;
}

const Header = (props: HeaderProps) => {
  const { type, onClose } = props;

  return (
    <HStack w="full" justifyContent="space-between">
      <Text
        fontSize="24px"
        lineHeight="28.51px"
        color="primary.500"
        fontWeight={700}
      >
        {type === 'add' ? 'Create' : 'Edit'} Approval Workflow Node
      </Text>

      <HStack color="#F50000" onClick={onClose}>
        <Text>Close</Text>
        <Icon as={CloseIcon} />
      </HStack>
    </HStack>
  );
};

export default Header;
