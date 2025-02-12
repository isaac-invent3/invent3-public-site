/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';

interface SliceProps {
  auditLog: AuditRecord | null;
}

const initialState: SliceProps = {
  auditLog: null,
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
  },
});

export const { setAuditLog, clearAuditLog } = AuditLogSlice.actions;

export default AuditLogSlice.reducer;
