import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplateFilter } from '~/lib/interfaces/template.interfaces';

const initialTemplateFilter = {
  contextTypeId: [],
  owner: [],
  createdDate: null,
};

export interface SliceProps {
  templateFilters: TemplateFilter;
}

const initialState: SliceProps = {
  templateFilters: initialTemplateFilter,
};

export const Template = createSlice({
  name: 'templateReducer',
  initialState,
  reducers: {
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

export const { updateTemplateFilter, clearTemplateFilter } = Template.actions;

export default Template.reducer;
