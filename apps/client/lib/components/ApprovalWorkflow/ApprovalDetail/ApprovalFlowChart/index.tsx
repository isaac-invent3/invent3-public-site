import React from 'react';
import { ApprovalFlowProvider } from './ApprovalContext';
import FlowChart from './FlowChart';

const ApprovalFlowChart = () => {
  return (
    <ApprovalFlowProvider>
      <FlowChart />
    </ApprovalFlowProvider>
  );
};

export default React.memo(ApprovalFlowChart);
