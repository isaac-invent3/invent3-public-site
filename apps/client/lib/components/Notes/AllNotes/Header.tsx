import { HStack, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import NoteForm from '../NoteForm';
import PageHeader from '../../UI/PageHeader';

const Header = () => {
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const {
    isOpen: isNoteFormOpened,
    onOpen: onNoteFormOpen,
    onClose: onNoteFormClose,
  } = useDisclosure();

  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
      spacing="16px"
      w="full"
    >
      <PageHeader>Notes</PageHeader>

      {data?.systemContextId && (
        <>
          <Button
            handleClick={onNoteFormOpen}
            customStyles={{
              w: '150px',
              alignSelf: 'end',
              height: { base: '36px', md: 'min-content' },
            }}
          >
            Add New Note
          </Button>

          <NoteForm onClose={onNoteFormClose} isOpen={isNoteFormOpened} />
        </>
      )}
    </Stack>
  );
};

export default Header;
