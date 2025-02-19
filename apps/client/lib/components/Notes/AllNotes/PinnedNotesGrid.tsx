import { Box, Grid, Text } from '@chakra-ui/react';
import { Note } from '~/lib/interfaces/notes.interfaces';
import NoteCard from './NoteCard';

interface PinnedNotesSectionProps {
  pinnedNotes: Note[];
}

const PinnedNotesSection = ({ pinnedNotes }: PinnedNotesSectionProps) => {
  if (!pinnedNotes.length) return null;

  return (
    <Box w="full">
      <Text size="md" color="black" fontWeight={800} mb="1em">
        Pinned Notes
      </Text>
      <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
        {pinnedNotes.map((item) => (
          <NoteCard key={item.noteId} data={{ ...item, isPinned: true }} />
        ))}
      </Grid>
    </Box>
  );
};

export default PinnedNotesSection;
