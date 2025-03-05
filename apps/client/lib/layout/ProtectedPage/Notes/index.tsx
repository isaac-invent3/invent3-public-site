import { HStack, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { FolderIcon } from '~/lib/components/CustomIcons';
import AllNotes from '~/lib/components/Notes/AllNotes';

const Notes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      px="12px"
      py="5px"
      pos="absolute"
      w="100px"
      h="40px"
      right={{ base: 10, md: 20 }}
      bottom={50}
      display="flex"
      alignItems="center"
      rounded="30px"
      gap="8px"
      cursor="pointer"
      transition="all 300ms ease-in-out"
      background="white"
      role="group"
      zIndex={999}
      sx={{
        boxShadow: `
      0px 3px 6px rgba(0, 0, 0, 0.1),
      0px 10px 10px rgba(0, 0, 0, 0.09),
      0px 23px 14px rgba(0, 0, 0, 0.05),
      0px 40px 16px rgba(0, 0, 0, 0.01),
      0px 63px 18px rgba(0, 0, 0, 0.0)
    `,
      }}
      _hover={{
        transform: 'scale(1.1)',
      }}
      onClick={onOpen}
    >
      <Icon
        as={FolderIcon}
        transition="all 300ms ease-in-out"
        _groupHover={{ transform: 'rotate(15deg) scale(1.2)' }}
      />

      <Text color="#838383" size="md" fontWeight={700}>
        Notes
      </Text>

      <AllNotes onClose={onClose} isOpen={isOpen} />
    </HStack>
  );
};

export default Notes;
