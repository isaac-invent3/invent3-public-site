import { Box, HStack, Text } from '@chakra-ui/react';
import { Note } from '~/lib/interfaces/notes.interfaces';
import NoteCard from './NoteCard';
import SkeletonGrid from './SkeletonGrid';
import EmptyNotes from './EmptyNotes';

interface PinnedNotesSectionProps {
  pinnedNotes: Note[];
  isFetching?: boolean;
}

const PinnedNotesSection = ({
  pinnedNotes,
  isFetching,
}: PinnedNotesSectionProps) => {
  return (
    <Box w="full">
      <Text size="md" color="black" fontWeight={800} mb="1em">
        Pinned Notes
      </Text>
      {isFetching && <SkeletonGrid count={8} />}
      {pinnedNotes.length === 0 && !isFetching && (
        <EmptyNotes
          customStyles={{ height: '200px' }}
          message="No Pinned Notes"
        />
      )}
      {!isFetching && pinnedNotes.length > 0 && (
        <HStack
          flexWrap="wrap"
          gap="16px"
          w="full"
          justifyContent={{ base: 'space-evenly', md: 'unset' }}
        >
          {pinnedNotes.map((item) => (
            <NoteCard key={item.noteId} data={{ ...item, isPinned: true }} />
          ))}
        </HStack>
      )}
    </Box>
  );
};

export default PinnedNotesSection;
