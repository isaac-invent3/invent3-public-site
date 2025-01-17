import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  SelectedTicketAction,
  Ticket,
  TicketCategory,
} from '~/lib/interfaces/ticket.interfaces';

interface SelectedTicket {
  data: Ticket;
  category?: TicketCategory;
  action: SelectedTicketAction[];
}

export interface SliceProps {
  selectedTicket: SelectedTicket | null;
}

const initialState: SliceProps = {
  selectedTicket: null,
};

export const TicketSlice = createSlice({
  name: 'ticketReducer',
  initialState,
  reducers: {
    setSelectedTicket: (state, { payload }: PayloadAction<SelectedTicket>) => {
      state.selectedTicket = payload;
    },

    clearSelectedTicket: (state) => {
      state.selectedTicket = null;
    },

    addSelectedAction: (
      state,
      { payload }: PayloadAction<SelectedTicketAction>
    ) => {
      state.selectedTicket?.action.push(payload);
    },

    removeSelectedAction: (
      state,
      { payload }: PayloadAction<SelectedTicketAction>
    ) => {
      if (state.selectedTicket?.action) {
        state.selectedTicket.action = state.selectedTicket?.action.filter(
          (action) => action !== payload
        );
      }
    },
  },
});

export const {
  clearSelectedTicket,
  addSelectedAction,
  removeSelectedAction,
  setSelectedTicket,
} = TicketSlice.actions;

export default TicketSlice.reducer;
