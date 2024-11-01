import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  FrequencyInfo,
  RepeatInterval,
} from '~/lib/interfaces/general.interfaces';

interface Info {
  frequency: FrequencyInfo;
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

const initialFrequency = {
  interval: 1,
  repeat: null,
  startDate: null,
  endDate: null,
  repeatIntervals: InitialRepeatInterval,
};

const InitialInfo = {
  frequency: initialFrequency,
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
    setFrequency: (state, { payload }: PayloadAction<FrequencyInfo>) => {
      state.info.frequency = payload;
    },
    updateFrequency: (
      state,
      { payload }: PayloadAction<Partial<FrequencyInfo>>
    ) => {
      state.info.frequency = { ...state.info.frequency, ...payload };
    },
    clearFrequency: (state) => {
      state.info.frequency = initialFrequency;
    },
    setRepeatInterval: (state, { payload }: PayloadAction<RepeatInterval>) => {
      state.info.frequency.repeatIntervals = payload;
    },
    updateRepeatInterval: (
      state,
      { payload }: PayloadAction<Partial<RepeatInterval>>
    ) => {
      state.info.frequency.repeatIntervals = {
        ...state.info.frequency.repeatIntervals,
        ...payload,
      };
    },
    clearRepeatInterval: (state) => {
      state.info.frequency.repeatIntervals = InitialRepeatInterval;
    },
  },
});

export const {
  setFrequency,
  setInfo,
  setRepeatInterval,
  updateInfo,
  updateFrequency,
  updateRepeatInterval,
  clearInfo,
  clearFrequency,
  clearRepeatInterval,
} = DateSlice.actions;

export default DateSlice.reducer;
