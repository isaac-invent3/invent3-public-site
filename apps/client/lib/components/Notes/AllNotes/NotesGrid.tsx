import { Grid, HStack } from '@chakra-ui/react';
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
    <HStack flexWrap="wrap" gap="16px" w="full">
      {items.map((item) => (
        <NoteCard key={item.noteId} data={item} />
      ))}
    </HStack>
  );
};

export default NotesGrid;
