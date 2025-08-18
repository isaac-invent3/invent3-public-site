import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '~/lib/interfaces/general.interfaces';
import { ReportFilterInput } from '~/lib/interfaces/report.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface SliceProps {
  filters: ReportFilterInput;
}

interface updateReportFilterPayload {
  option: Option | string;
  filterLabel: keyof ReportFilterInput;
}

const getTodayDate = () => {
  return dateFormatter(new Date(), 'DD/MM/YYYY') as string;
};

const getFirstDayOfYear = () => {
  const now = new Date();
  return dateFormatter(
    new Date(now.getFullYear(), 0, 1),
    'DD/MM/YYYY'
  ) as string;
};

const initialState: SliceProps = {
  filters: {
    region: [],
    area: [],
    branch: [],
    companies: [],
    fromDate: getFirstDayOfYear(),
    toDate: getTodayDate(),
  },
};

export const ReportSlice = createSlice({
  name: 'reportReducer',
  initialState,
  reducers: {
    updateReportFilters: (
      state,
      { payload }: PayloadAction<updateReportFilterPayload>
    ) => {
      const { filterLabel, option } = payload;

      const filterData = state.filters;

      if (
        typeof option === 'string' ||
        typeof filterData[filterLabel] === 'string'
      ) {
        state.filters = { ...state.filters, [filterLabel]: option };
      } else {
        const newValue =
          filterData[filterLabel].find(
            (item) => item.value === option.value
          ) !== undefined
            ? filterData[filterLabel].filter(
                (item) => item.value !== option.value
              )
            : [...filterData[filterLabel], option];

        state.filters = { ...state.filters, [filterLabel]: newValue };
      }
    },

    resetReportFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { resetReportFilters, updateReportFilters } = ReportSlice.actions;

export default ReportSlice.reducer;
