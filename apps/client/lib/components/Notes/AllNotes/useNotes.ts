import { OPERATORS } from '@repo/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { set } from 'lodash';
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
  const [searchData, setSearchData] = useState<BaseApiResponse<
    ListResponse<Note>
  > | null>(null);
  const [pinnedPageNumber, setPinnedPageNumber] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: pinnedNotes,
    isLoading: isGettingPinnedNotes,
    isFetching: isFetchingPinnedNotes,
  } = useGetPinnedNotesQuery(
    {
      userId: user?.userId!,
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: pinnedPageNumber,
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [
        typeof data?.contextId === 'string'
          ? Number(data?.contextId)
          : data?.contextId!,
      ],
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
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: pageNumber,
      systemContextTypeId: data?.systemContextId!,
      systemContextIds: [
        typeof data?.contextId === 'string'
          ? Number(data?.contextId)
          : data?.contextId!,
      ],
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

    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const handleSearch = useCallback(async () => {
    if (search) {
      const response = await handleSubmit(searchNotes, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data);
    }
  }, [searchNotes, searchCriterion]);

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setSearchData(null);
      setPageNumber(1);
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
    if (search && searchData) return searchData?.data?.items;

    return [];
  };

  return {
    searchedNotes: searchedNotes(),
    isFetchingOtherNotes:
      isGettingUnPinnedNotes || isFetchingUnpinnedNotes || isSearchingNotes,
    isFetchingPinnedNotes: isGettingPinnedNotes || isFetchingPinnedNotes,
    unPinnedNotes: unPinnedNotes?.data?.items ?? [],
    pinnedNotes: pinnedNotes?.data?.items ?? [],
    setSearch,
    isSearched: Boolean(search),
    pinnedTotalPages: pinnedNotes?.data?.totalPages ?? 0,
    otherNotesTotalPages: unPinnedNotes?.data?.totalPages ?? 0,
    pinnedPageNumber,
    pageNumber,
    setPinnedPageNumber: setPinnedPageNumber,
    setPageNumber: setPageNumber,
  };
};

export default useNotes;
