import { Icon, StackProps, Text, VStack } from '@chakra-ui/react';
import { EmptyNotesIcon } from '../../CustomIcons';

interface EmptyNotesProps {
  message?: string;
  customStyles?: StackProps;
}
const EmptyNotes = ({ message, customStyles }: EmptyNotesProps) => {
  return (
    <VStack justifyContent="center" h="300px" w="full" {...customStyles}>
      <Icon as={EmptyNotesIcon} w="130px" h="130px" mb="8px" />
      <Text size="md" color="#2C2C2C" fontWeight={700}>
        {message ?? 'No Notes'}
      </Text>
    </VStack>
  );
};

export default EmptyNotes;
