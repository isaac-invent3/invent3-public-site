import { Divider, ModalBody, ModalHeader, VStack } from '@chakra-ui/react';
import { GenericModal } from '@repo/ui/components';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import Filters from './Filters';
import Header from './Header';
import NotesGrid from './NotesGrid';
import PinnedNotesSection from './PinnedNotesGrid';
import SkeletonGrid from './SkeletonGrid';
import useNotes from './useNotes';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllNotes = (props: AllNotesModalProps) => {
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const { isOpen, onClose } = props;
  const {
    isFetchingNotes,
    notes,
    isSearched,
    pinnedNotes,
    setSearch,
    unPinnedNotes,
  } = useNotes(data);

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{
          width: { lg: '1150px' },
          padding: '48px',
          bgColor: '#E7E7E7',
        }}
      >
        <ModalHeader m={0} p={0}>
          <Header />
        </ModalHeader>

        <ModalBody p={0} m={0} width="full">
          <VStack
            width="full"
            spacing="16px"
            divider={<Divider borderColor="#BBBBBB" />}
            maxH="550px"
            overflowY="scroll"
          >
            <Filters setSearch={setSearch} />

            {isFetchingNotes && <SkeletonGrid count={15} />}

            {!isSearched && <PinnedNotesSection pinnedNotes={pinnedNotes} />}

            <NotesGrid
              notes={notes}
              unPinnedNotes={unPinnedNotes}
              isSearched={isSearched}
            />
          </VStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default AllNotes;
