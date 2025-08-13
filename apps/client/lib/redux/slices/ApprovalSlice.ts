/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';

interface SliceProps {
  approvalRequest: ApprovalWorkflowRequest | null;
  openPopoverId: string | null;
}

const initialState: SliceProps = {
  approvalRequest: null,
  openPopoverId: null,
};

export const ApprovalSlice = createSlice({
  name: 'approvalReducer',
  initialState,
  reducers: {
    setApprovalRequest: (
      state,
      { payload }: PayloadAction<ApprovalWorkflowRequest>
    ) => {
      state.approvalRequest = payload;
    },
    clearApprovalRequest: (state) => {
      state.approvalRequest = null;
    },
    setOpenPopoverId: (state, { payload }: PayloadAction<string | null>) => {
      state.openPopoverId = payload;
    },
  },
});

export const { setApprovalRequest, clearApprovalRequest, setOpenPopoverId } =
  ApprovalSlice.actions;

export default ApprovalSlice.reducer;
