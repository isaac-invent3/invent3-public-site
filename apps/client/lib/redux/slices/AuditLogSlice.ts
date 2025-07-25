/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';

interface SliceProps {
  auditLog: AuditRecord | null;
  isLoadingDataChanged: boolean;
}

const initialState: SliceProps = {
  auditLog: null,
  isLoadingDataChanged: false,
};

export const AuditLogSlice = createSlice({
  name: 'auditLogReducer',
  initialState,
  reducers: {
    setAuditLog: (state, { payload }: PayloadAction<AuditRecord>) => {
      state.auditLog = payload;
    },
    clearAuditLog: (state) => {
      state.auditLog = null;
    },
    setIsLoadingDataChanged: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingDataChanged = payload;
    },
  },
});

export const { setAuditLog, clearAuditLog, setIsLoadingDataChanged } =
  AuditLogSlice.actions;

export default AuditLogSlice.reducer;
