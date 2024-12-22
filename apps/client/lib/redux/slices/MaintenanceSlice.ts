import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Option } from '~/lib/interfaces/general.interfaces';
import {
  PlanFormDetails,
  ScheduleFormDetails,
  TemplateFilter,
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
  planForm: PlanFormDetails;
  templateFilters: TemplateFilter;
}

const initialScheduleForm = {
  name: null,
  planId: null,
  scheduleId: null,
  localId: null,
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
  endDate: null,
  completionDate: null,
  ticketId: null,
  intervalValue: null,
  dayOccurrences: [],
  weekOccurrences: [],
  monthOccurrences: [],
  yearOccurrences: {},
  deletedTaskIDs: [],
  updatedTaskIDs: [],
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
  firstInstanceDate: null,
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
  planId: null,
  planName: null,
  planTypeId: null,
  planTypeName: null,
  assetName: null,
  assetGroupTypeID: null,
  assetGroupContextID: null,
  assetGroupTypeName: null,
  assetGroupContextName: null,
  assetId: null,
  startDate: null,
  endDate: null,
  owner: null,
  ownerId: null,
  cost: null,
  deletedScheduleIDs: [],
  updatedScheduleIDs: [],
  schedules: [],
};

const initialTemplateFilter = {
  createdDate: null,
  owner: [],
  apply: false,
};

const initialState: SliceProps = {
  scheduleInfo: InitialScheduleInfo,
  scheduleForm: initialScheduleForm,
  planForm: initialPlanForm,
  templateFilters: initialTemplateFilter,
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
    setPlanForm: (state, { payload }: PayloadAction<PlanFormDetails>) => {
      state.planForm = payload;
    },
    updatePlanForm: (
      state,
      { payload }: PayloadAction<Partial<PlanFormDetails>>
    ) => {
      state.planForm = { ...state.planForm, ...payload };
    },
    clearPlanForm: (state) => {
      state.planForm = initialPlanForm;
    },
    updateTemplateFilter: (
      state,
      { payload }: PayloadAction<Partial<TemplateFilter>>
    ) => {
      state.templateFilters = { ...state.templateFilters, ...payload };
    },
    clearTemplateFilter: (state) => {
      state.templateFilters = initialTemplateFilter;
    },
  },
});

export const {
  updateScheduleInfo,
  clearScheduleInfo,
  setScheduleForm,
  updateScheduleForm,
  clearScheduleForm,
  setPlanForm,
  updatePlanForm,
  clearPlanForm,
  updateTemplateFilter,
  clearTemplateFilter,
} = Maintenance.actions;

export default Maintenance.reducer;
