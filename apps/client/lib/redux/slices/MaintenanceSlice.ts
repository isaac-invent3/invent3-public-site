import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Option } from '~/lib/interfaces/general.interfaces';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';

interface ScheduleInfo {
  selectedState: Option | null;
  selectedCountry: Option | null;
  isLoading: boolean;
  timelineStartDate: string | null;
  timelineEndDate: string | null;
}
export interface SliceProps {
  scheduleInfo: ScheduleInfo;
  scheduleForm: ScheduleFormDetails;
}

const initialScheduleForm = {
  name: null,
  planId: null,
  scheduleId: null,
  planName: null,
  typeId: null,
  typeName: null,
  assetId: null,
  assetName: null,
  sla: null,
  frequencyId: null,
  frequencyName: null,
  assetLocation: null,
  description: null,
  comment: null,
  scheduledDate: null,
  completionDate: null,
  ticketId: null,
  contactDetails: {
    picture: null,
    contactPerson: null,
  },
};

const InitialScheduleInfo = {
  selectedState: null,
  selectedCountry: {
    label: 'Nigeria',
    value: 1,
  },
  isLoading: false,
  timelineStartDate: null,
  timelineEndDate: null,
};

const initialState: SliceProps = {
  scheduleInfo: InitialScheduleInfo,
  scheduleForm: initialScheduleForm,
};

export const Maintenance = createSlice({
  name: 'maintenanceReducer',
  initialState,
  reducers: {
    updateScheduleInfo: (
      state,
      { payload }: PayloadAction<Partial<ScheduleInfo>>
    ) => {
      state.scheduleInfo = { ...state.scheduleInfo, ...payload };
    },
    clearScheduleInfo: (state) => {
      state.scheduleInfo = InitialScheduleInfo;
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
  updateScheduleInfo,
  clearScheduleInfo,
  setScheduleForm,
  updateScheduleForm,
  clearScheduleForm,
} = Maintenance.actions;

export default Maintenance.reducer;
