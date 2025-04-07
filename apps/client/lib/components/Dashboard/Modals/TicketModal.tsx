import { useCallback, useEffect, useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { OPERATORS } from '@repo/constants';
import { useDisclosure } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import {
  ticketApi,
  useGetAllTicketsQuery,
  useSearchTicketsMutation,
} from '~/lib/redux/services/ticket.services';
import TicketDrawerWrapper from '../../TicketManagement/Drawers/TicketDrawerWrapper';
import TicketTable from '../../TicketManagement/TicketTable';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { useAppDispatch } from '~/lib/redux/hooks';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TicketModal = (props: TicketModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTicketsQuery({
    pageNumber,
    pageSize,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Ticket>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchTicket, { isLoading: searchLoading }] = useSearchTicketsMutation(
    {}
  );
  const { getSearchParam, clearSearchParamsAfter, updateSearchParam } =
    useCustomSearchParams();
  const ticketId = getSearchParam(SYSTEM_CONTEXT_DETAILS.TICKETS.slug);
  const {
    isOpen: isOpenTicket,
    onClose: onCloseTicket,
    onOpen: onOpenTicket,
  } = useDisclosure();
  const dispatch = useAppDispatch();

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'ticketTitle',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search) {
      const response = await handleSubmit(searchTicket, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data);
    }
  }, [searchTicket, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  //Open Task detail drawer if task id exists
  useEffect(() => {
    if (ticketId !== undefined) {
      onOpenTicket();
    }
  }, [ticketId]);

  // SignalR Connection
  const connectionState = useSignalR('tickets-hub');

  useSignalREventHandler({
    eventName: 'CreateTicket',
    connectionState,
    callback: (newTicket) => {
      // Update the query cache when a new ticket is received
      const parsedTicket = JSON.parse(newTicket);
      dispatch(
        ticketApi.util.updateQueryData(
          'getAllTickets',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedTicket); // Add new ticket to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateTicket',
    connectionState,
    callback: (updatedTicket) => {
      // Update the query cache when a ticket is updated
      const parsedTicket = JSON.parse(updatedTicket);
      dispatch(
        ticketApi.util.updateQueryData(
          'getAllTickets',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.ticketId === parsedTicket.ticketId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedTicket;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteTicket',
    connectionState,
    callback: (deletedTicket) => {
      // Update the query cache when a ticket is deleted
      const parsedTicket = JSON.parse(deletedTicket);
      dispatch(
        ticketApi.util.updateQueryData(
          'getAllTickets',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.ticketId !== parsedTicket.ticketId
              ); // Remove the deleted ticket
            }
          }
        )
      );
    },
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Tickets'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={
          search && searchData
            ? searchData.data?.totalPages
            : (data?.data?.totalPages ?? 0)
        }
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        <TicketTable
          data={search && searchData ? searchData : data}
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          isSelectable
          currentPage={pageNumber}
          pageSize={pageSize}
          setCurrentPage={setPageNumber}
          setPageSize={setPageSize}
          emptyLines={25}
          shouldHideFooter={true}
        />
      </GenericTemplateModal>
      {ticketId && (
        <TicketDrawerWrapper
          isOpen={isOpenTicket}
          onClose={() => {
            clearSearchParamsAfter(SYSTEM_CONTEXT_DETAILS.TICKETS.slug, {
              removeSelf: true,
            });
            onCloseTicket();
          }}
          data={null}
          category="new"
          action="view"
        />
      )}
    </>
  );
};

export default TicketModal;
