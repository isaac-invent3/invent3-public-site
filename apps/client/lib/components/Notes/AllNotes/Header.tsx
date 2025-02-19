import { HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import NoteForm from '../NoteForm';

const Header = () => {
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const {
    isOpen: isNoteFormOpened,
    onOpen: onNoteFormOpen,
    onClose: onNoteFormClose,
  } = useDisclosure();

  return (
    <HStack justifyContent="space-between" w="full">
      <Text lineHeight="38px" fontSize="32px" fontWeight={800}>
        Notes
      </Text>

      {data?.systemContextId && (
        <>
          <Button handleClick={onNoteFormOpen} customStyles={{ w: '150px' }}>
            Add New Note
          </Button>

          <NoteForm onClose={onNoteFormClose} isOpen={isNoteFormOpened} />
        </>
      )}
    </HStack>
  );
};

export default Header;
