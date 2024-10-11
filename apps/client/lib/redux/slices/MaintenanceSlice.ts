import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Option } from '~/lib/interfaces/general.interfaces';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';

interface Info {
  selectedState: Option | null;
  selectedCountry: Option | null;
  isLoading: boolean;
}
export interface SliceProps {
  info: Info;
  scheduleForm: ScheduleFormDetails;
}

const initialScheduleForm = {
  name: null,
  planId: null,
  planName: null,
  typeId: null,
  typeName: null,
  assetId: null,
  assetName: null,
  assetLocation: null,
  description: null,
  scheduledDate: null,
  completionDate: null,
  ticketId: null,
  contactDetails: {
    picture: null,
    contactPerson: null,
  },
};

const InitialInfo = {
  selectedState: null,
  selectedCountry: {
    label: 'Nigeria',
    value: 1,
  },
  isLoading: false,
};

const initialState: SliceProps = {
  info: InitialInfo,
  scheduleForm: initialScheduleForm,
};

export const Maintenance = createSlice({
  name: 'maintenanceReducer',
  initialState,
  reducers: {
    updateInfo: (state, { payload }: PayloadAction<Partial<Info>>) => {
      state.info = { ...state.info, ...payload };
    },
    clearInfo: (state) => {
      state.info = InitialInfo;
    },

    setScheduleForm: (
      state,
      { payload }: PayloadAction<ScheduleFormDetails>
    ) => {
      state.scheduleForm = payload;
    },
    updateScheduleForm: (
      state,
      { payload }: PayloadAction<Partial<ScheduleFormDetails>>
    ) => {
      state.scheduleForm = { ...state.scheduleForm, ...payload };
    },
    clearScheduleForm: (state) => {
      state.scheduleForm = initialScheduleForm;
    },
  },
});

export const {
  updateInfo,
  clearInfo,
  setScheduleForm,
  updateScheduleForm,
  clearScheduleForm,
} = Maintenance.actions;

export default Maintenance.reducer;
