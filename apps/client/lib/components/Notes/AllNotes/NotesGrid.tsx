import { Grid } from '@chakra-ui/react';
import NoteCard from './NoteCard';
import { Note } from '~/lib/interfaces/notes.interfaces';

interface NotesGridProps {
  notes: Note[];
  unPinnedNotes: Note[];
  isSearched: boolean;
}

const NotesGrid = ({ notes, unPinnedNotes, isSearched }: NotesGridProps) => {
  const items = isSearched ? notes : unPinnedNotes;

  if (!items.length) return null;

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
      {items.map((item) => (
        <NoteCard key={item.noteId} data={item} />
      ))}
    </Grid>
  );
};

export default NotesGrid;
