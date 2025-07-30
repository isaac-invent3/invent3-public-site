import {
  Divider,
  Flex,
  ModalBody,
  ModalHeader,
  VStack,
} from '@chakra-ui/react';
import {
  ButtonPagination,
  GenericModal,
  ModalCloseButtonText,
} from '@repo/ui/components';
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
    isFetchingPinnedNotes,
    isFetchingOtherNotes,
    searchedNotes,
    isSearched,
    pinnedNotes,
    setSearch,
    unPinnedNotes,
    pinnedTotalPages,
    otherNotesTotalPages,
    pinnedPageNumber,
    pageNumber,
    setPinnedPageNumber,
    setPageNumber,
  } = useNotes({ data: data, isOpen: isOpen });

  const renderContent = () => {
    const hasNotes = searchedNotes.length || unPinnedNotes.length;
    return (
      <VStack
        width="full"
        spacing="16px"
        divider={<Divider borderColor="#BBBBBB" />}
      >
        {!isSearched && (
          <VStack width="full" spacing="16px">
            <PinnedNotesSection
              pinnedNotes={pinnedNotes}
              isFetching={isFetchingPinnedNotes}
            />
            <ButtonPagination
              currentPage={pinnedPageNumber}
              setCurrentPage={setPinnedPageNumber}
              totalPages={pinnedTotalPages}
              showIfHasMorePages={true}
            />
          </VStack>
        )}
        {isFetchingOtherNotes && <SkeletonGrid count={10} />}
        {!isFetchingOtherNotes && !hasNotes && <EmptyNotes />}
        {hasNotes && !isFetchingOtherNotes && (
          <VStack width="full" spacing="16px">
            <NotesGrid
              notes={searchedNotes}
              unPinnedNotes={unPinnedNotes}
              isSearched={isSearched}
            />
            <ButtonPagination
              currentPage={pageNumber}
              setCurrentPage={setPageNumber}
              totalPages={otherNotesTotalPages}
              showIfHasMorePages={true}
            />
          </VStack>
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
          px: { base: '16px', md: '48px' },
          pb: { base: '32px', md: '48px' },
          pt: { base: '32px', md: 0 },
          bgColor: '#E7E7E7',
          maxW: '80vw',
        }}
      >
        <ModalHeader
          m={0}
          p={0}
          position="relative"
          pt={{ base: '32px', md: '48px' }}
        >
          <Flex position="absolute" top="0" right="0">
            <Flex mt="17px">
              <ModalCloseButtonText onClose={onClose} />
            </Flex>
          </Flex>
          <Header />
        </ModalHeader>

        <ModalBody p={0} m={0} width="full" mt={{ base: '16px', md: '32px' }}>
          <VStack
            width="full"
            spacing="16px"
            divider={<Divider borderColor="#BBBBBB" />}
            maxH="550px"
            minH="500px"
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
