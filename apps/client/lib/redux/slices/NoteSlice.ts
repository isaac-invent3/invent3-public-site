import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParseUrlDataResponse } from '~/lib/hooks/useParseUrl';
import { Note } from '~/lib/interfaces/notes.interfaces';

export interface SliceProps {
  notes: Note[];
  selectedNote: Note | null;
  parsedUrlData: ParseUrlDataResponse | null;
}

const initialState: SliceProps = {
  notes: [],
  selectedNote: null,
  parsedUrlData: null,
};

export const NoteSlice = createSlice({
  name: 'noteReducer',
  initialState,
  reducers: {
    initializeNotes: (state, { payload }: PayloadAction<Note[]>) => {
      state.notes = payload;
    },
    selectNote: (state, { payload }: PayloadAction<Note>) => {
      state.selectedNote = payload;
    },
    deSelectNote: (state) => {
      state.selectedNote = null;
    },
    setParsedUrlData: (
      state,
      { payload }: PayloadAction<ParseUrlDataResponse | null>
    ) => {
      state.parsedUrlData = payload;
    },
  },
});

export const { deSelectNote, initializeNotes, selectNote, setParsedUrlData } =
  NoteSlice.actions;

export default NoteSlice.reducer;
