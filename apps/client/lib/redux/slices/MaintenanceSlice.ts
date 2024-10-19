import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Option } from '~/lib/interfaces/general.interfaces';
import {
  planFormDetails,
  ScheduleFormDetails,
} from '~/lib/interfaces/maintenance.interfaces';

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
  planForm: planFormDetails;
}

const initialScheduleForm = {
  name: null,
  planId: null,
  scheduleId: null,
  typeId: null,
  typeName: null,
  assetId: null,
  assetTypeId: null,
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
  maintenancePlanInfo: {
    planName: null,
    planType: null,
    assetName: null,
    assetTypeName: null,
    planStatus: null,
    startDate: null,
    endDate: null,
  },
  taskCount: 0,
  tasks: [],
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

const initialPlanForm = {
  planName: null,
  planTypeId: null,
  frequencyId: null,
  assetId: null,
  assetTypeId: null,
  startDate: null,
  endDate: null,
  ownerId: null,
  cost: null,
};

const initialState: SliceProps = {
  scheduleInfo: InitialScheduleInfo,
  scheduleForm: initialScheduleForm,
  planForm: initialPlanForm,
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
