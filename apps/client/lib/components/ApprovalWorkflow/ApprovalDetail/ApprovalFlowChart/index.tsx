import React from 'react';
import { ApprovalFlowProvider } from './Context';
import FlowChart from './FlowChart';

const ApprovalFlowChart = () => {
  return (
    <ApprovalFlowProvider>
      <FlowChart />
    </ApprovalFlowProvider>
  );
};

export default React.memo(ApprovalFlowChart);
