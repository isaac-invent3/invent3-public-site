import {
  Box,
  Divider,
  Grid,
  ModalBody,
  ModalHeader,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OPERATORS } from '@repo/constants';
import { ListResponse } from '@repo/interfaces';
import { GenericModal } from '@repo/ui/components';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import useFormatUrl from '~/lib/hooks/useFormatUrl';
import useParseUrlData from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useGetAllUserNotesQuery,
  useGetPinnedNotesQuery,
  useSearchNotesMutation,
} from '~/lib/redux/services/notes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import Filters from './Filters';
import Header from './Header';
import NoteCard from './NoteCard';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllNotes = (props: AllNotesModalProps) => {
  const { isOpen, onClose } = props;
  const formattedUrl = useFormatUrl();
  const data = useParseUrlData(formattedUrl);
  const [search, setSearch] = useState('');

  const session = useSession();
  const user = session?.data?.user;

  const { data: pinnedNotes, isLoading: isGettingPinnedNotes } =
    useGetPinnedNotesQuery(
      { userId: user?.userId!, pageSize: 5 },
      { skip: !user?.userId }
    );

  const { handleSubmit } = useCustomMutation();

  const [searchNotes, { isLoading: searchLoading }] = useSearchNotesMutation(
    {}
  );

  const [searchData, setSearchData] = useState<ListResponse<Note> | null>(null);

  const {
    data: notes,
    isLoading: isGettingNotes,
    isFetching: isFetchingNotes,
  } = useGetAllUserNotesQuery(
    {
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [],
    },
    { skip: !user?.userId || !data?.systemContextId || search !== '' }
  );

  // Search Criterion
  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'title',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),

    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const handleSearch = useCallback(async () => {
    if (search) {
      const response = await handleSubmit(searchNotes, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data?.data);
    }
  }, [searchNotes, searchCriterion]);

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search]);

  const renderedData = () => {
    if (search && searchData) return searchData.items;

    return notes?.data?.items ?? [];
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
            overflowY="scroll"
          >
            <Filters setSearch={setSearch} />

            <Box w="full">
              <Text size="md" color="black" fontWeight={800} mb="1em">
                Pinned Notes
              </Text>

              <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
                {isGettingPinnedNotes &&
                  Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton
                        isLoaded={false}
                        rounded="8px"
                        p="8px"
                        h="180px"
                        key={index}
                      />
                    ))}

                {!isGettingPinnedNotes &&
                  pinnedNotes?.data.items?.map((item) => (
                    <NoteCard data={item} key={item.noteId} isPinned />
                  ))}
              </Grid>
            </Box>
            <Grid templateColumns="repeat(6, 1fr)" gap="16px" w="full">
              {isGettingNotes &&
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      isLoaded={false}
                      rounded="8px"
                      p="8px"
                      h="180px"
                      key={index}
                    />
                  ))}


              {!isGettingNotes &&
                renderedData().map((item) => (
                  <NoteCard
                    data={item}
                    key={item.noteId}
                    isFetching={isFetchingNotes}
                  />
                ))}
            </Grid>
          </VStack>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default AllNotes;
