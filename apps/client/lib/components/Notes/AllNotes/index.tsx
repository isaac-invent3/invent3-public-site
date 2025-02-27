import { Divider, ModalBody, ModalHeader, VStack } from '@chakra-ui/react';
import { GenericModal } from '@repo/ui/components';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import EmptyNotes from './EmptyNotes';
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

  const renderContent = () => {
    if (isFetchingNotes) return <SkeletonGrid count={15} />;

    const hasNotes = notes.length || unPinnedNotes.length;
    const hasPinnedNotes = pinnedNotes.length > 0;
    const hasNoNotes = !hasNotes && !hasPinnedNotes;

    if (hasNoNotes) return <EmptyNotes />;

    return (
      <VStack
        width="full"
        spacing="16px"
        divider={<Divider borderColor="#BBBBBB" />}
      >
        {!isSearched && hasPinnedNotes && (
          <PinnedNotesSection pinnedNotes={pinnedNotes} />
        )}

        {hasNotes && (
          <NotesGrid
            notes={notes}
            unPinnedNotes={unPinnedNotes}
            isSearched={isSearched}
          />
        )}
      </VStack>
    );
  };

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
            minH='500px'
            overflowY="scroll"
          >
            <Filters setSearch={setSearch} />

            {renderContent()}
          </VStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default AllNotes;
