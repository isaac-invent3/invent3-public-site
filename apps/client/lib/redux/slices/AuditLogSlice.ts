/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuditLog } from '~/lib/interfaces/log.interfaces';

interface SliceProps {
  auditLog: AuditLog | null;
}

const initialState: SliceProps = {
  auditLog: null,
};

export const AuditLogSlice = createSlice({
  name: 'auditLogReducer',
  initialState,
  reducers: {
    setAuditLog: (state, { payload }: PayloadAction<AuditLog>) => {
      state.auditLog = payload;
    },
    clearAuditLog: (state) => {
      state.auditLog = null;
    },
  },
});

export const { setAuditLog, clearAuditLog } = AuditLogSlice.actions;

export default AuditLogSlice.reducer;
