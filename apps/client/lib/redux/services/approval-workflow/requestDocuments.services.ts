import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const approvalWorkflowRequestDocumentApi = createApi({
  reducerPath: 'approvalWorkflowRequestDocumentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export const {} = approvalWorkflowRequestDocumentApi;
