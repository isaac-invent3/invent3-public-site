/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApprovalWorkflowRequest } from '~/lib/interfaces/approvalWorkflow.interfaces';

interface SliceProps {
  approvalRequest: ApprovalWorkflowRequest | null;
}

const initialState: SliceProps = {
  approvalRequest: null,
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
  },
});

export const { setApprovalRequest, clearApprovalRequest } =
  ApprovalSlice.actions;

export default ApprovalSlice.reducer;
