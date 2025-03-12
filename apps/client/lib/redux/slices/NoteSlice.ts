import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '~/lib/interfaces/notes.interfaces';

export interface SliceProps {
  notes: Note[];
  selectedNote: Note | null;
}

const initialState: SliceProps = {
  notes: [],
  selectedNote: null,
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
  },
});

export const { deSelectNote, initializeNotes, selectNote } = NoteSlice.actions;

export default NoteSlice.reducer;
