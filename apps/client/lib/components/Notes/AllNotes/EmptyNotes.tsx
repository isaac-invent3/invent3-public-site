import { Icon, Text, VStack } from '@chakra-ui/react';
import { EmptyNotesIcon } from '../../CustomIcons';

const EmptyNotes = () => {
  return (
    <VStack justifyContent="center" h="500px" w="full">
      <Icon as={EmptyNotesIcon} w="130px" h="130px" mb="8px" />
      <Text size="md" color="#2C2C2C" fontWeight={700}>
        No Notes
      </Text>
    </VStack>
  );
};

export default EmptyNotes;
