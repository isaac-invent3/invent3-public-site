import React from 'react';
import { ApprovalFlowProvider } from './Components/Context';
import FlowChart from './Components/FlowChart';

const ApprovalFlowChart = () => {
  return (
    <ApprovalFlowProvider>
      <FlowChart />
    </ApprovalFlowProvider>
  );
};

export default React.memo(ApprovalFlowChart);
