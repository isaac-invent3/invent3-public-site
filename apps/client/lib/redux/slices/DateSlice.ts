import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  RecurrenceInfo,
  RepeatInterval,
} from '~/lib/interfaces/general.interfaces';

interface Info {
  recurrence: RecurrenceInfo;
}
export interface SliceProps {
  info: Info;
}

const InitialRepeatInterval = {
  annually: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  },
  daily: [],
  weekly: [],
  monthly: [],
};

const initialRecurrence = {
  interval: 1,
  frequency: null,
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
  repeatIntervals: InitialRepeatInterval,
};

const InitialInfo = {
  recurrence: initialRecurrence,
};

const initialState: SliceProps = {
  info: InitialInfo,
};

export const DateSlice = createSlice({
  name: 'dateReducer',
  initialState,
  reducers: {
    setInfo: (state, { payload }: PayloadAction<Info>) => {
      state.info = payload;
    },
    updateInfo: (state, { payload }: PayloadAction<Partial<Info>>) => {
      state.info = { ...state.info, ...payload };
    },
    clearInfo: (state) => {
      state.info = InitialInfo;
    },
    setRecurrence: (state, { payload }: PayloadAction<RecurrenceInfo>) => {
      state.info.recurrence = payload;
    },
    updateRecurrence: (
      state,
      { payload }: PayloadAction<Partial<RecurrenceInfo>>
    ) => {
      state.info.recurrence = { ...state.info.recurrence, ...payload };
    },
    clearRecurrence: (state) => {
      state.info.recurrence = initialRecurrence;
    },
    setRepeatInterval: (state, { payload }: PayloadAction<RepeatInterval>) => {
      state.info.recurrence.repeatIntervals = payload;
    },
    updateRepeatInterval: (
      state,
      { payload }: PayloadAction<Partial<RepeatInterval>>
    ) => {
      state.info.recurrence.repeatIntervals = {
        ...state.info.recurrence.repeatIntervals,
        ...payload,
      };
    },
    clearRepeatInterval: (state) => {
      state.info.recurrence.repeatIntervals = InitialRepeatInterval;
    },
  },
});

export const {
  setRecurrence,
  setInfo,
  setRepeatInterval,
  updateInfo,
  updateRecurrence,
  updateRepeatInterval,
  clearInfo,
  clearRecurrence,
  clearRepeatInterval,
} = DateSlice.actions;

export default DateSlice.reducer;
