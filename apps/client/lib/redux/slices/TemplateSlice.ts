import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template, TemplateFilter } from '~/lib/interfaces/template.interfaces';

const initialTemplateFilter = {
  contextTypeId: [],
  owner: [],
  createdDate: null,
};

export interface SliceProps {
  templateFilters: TemplateFilter;
  template?: Template | null;
}

const initialState: SliceProps = {
  templateFilters: initialTemplateFilter,
  template: null,
};

export const TemplateSlice = createSlice({
  name: 'templateReducer',
  initialState,
  reducers: {
    setTemplate: (state, { payload }: PayloadAction<Template>) => {
      state.template = payload;
    },
    clearTemplate: (state) => {
      state.template = null;
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
  setTemplate,
  clearTemplate,
  updateTemplateFilter,
  clearTemplateFilter,
} = TemplateSlice.actions;

export default TemplateSlice.reducer;
