import { OPERATORS } from '@repo/constants';
import { ListResponse } from '@repo/interfaces';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ParseUrlDataResponse } from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';
import {
  useGetPinnedNotesQuery,
  useGetUnPinnedNotesQuery,
  useSearchNotesMutation,
} from '~/lib/redux/services/notes.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const useNotes = ({
  data,
  isOpen,
}: {
  data: ParseUrlDataResponse | null;
  isOpen: boolean;
}) => {
  const session = useSession();
  const user = session?.data?.user;
  const [search, setSearch] = useState('');
  const { handleSubmit } = useCustomMutation();
  const [searchData, setSearchData] = useState<ListResponse<Note> | null>(null);

  const {
    data: pinnedNotes,
    isLoading: isGettingPinnedNotes,
    isFetching: isFetchingPinnedNotes,
  } = useGetPinnedNotesQuery(
    {
      userId: user?.userId!,
      pageSize: 15,
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [],
    },
    { skip: !user?.userId || !data?.systemContextId || !isOpen }
  );

  const {
    data: unPinnedNotes,
    isLoading: isGettingUnPinnedNotes,
    isFetching: isFetchingUnpinnedNotes,
  } = useGetUnPinnedNotesQuery(
    {
      userId: user?.userId!,
      pageSize: 15,
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [],
    },
    { skip: !user?.userId || !data?.systemContextId || !isOpen }
  );

  //   Search Notes
  const [searchNotes, { isLoading: isSearchingNotes }] = useSearchNotesMutation(
    {}
  );

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

  const isFetchingNotes = useMemo(
    () =>
      isSearchingNotes ||
      isGettingUnPinnedNotes ||
      isGettingPinnedNotes ||
      isFetchingPinnedNotes ||
      isFetchingUnpinnedNotes,
    [
      isSearchingNotes,
      isGettingPinnedNotes,
      isGettingUnPinnedNotes,
      isFetchingUnpinnedNotes,
      isFetchingPinnedNotes,
    ]
  );

  const searchedNotes = () => {
    if (search && searchData) return searchData.items;

    return [];
  };

  return {
    searchedNotes: searchedNotes(),
    isFetchingNotes,
    unPinnedNotes: unPinnedNotes?.data?.items ?? [],
    pinnedNotes: pinnedNotes?.data?.items ?? [],

    setSearch,
    isSearched: Boolean(search),
  };
};

export default useNotes;
