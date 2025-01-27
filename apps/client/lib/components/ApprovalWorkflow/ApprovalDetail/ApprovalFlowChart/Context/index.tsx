import { createContext, ReactNode, useContext, useState } from 'react';
import { ApprovalFlowInitialElement, ContextValue } from './interfaces';

const ApprovalFlowContext = createContext<ContextValue | undefined>(undefined);

function useApprovalFlowContext() {
  const context = useContext(ApprovalFlowContext);

  if (!context) {
    throw new Error(
      'useApprovalFlowContext must be used within an ApprovalFlowProvider'
    );
  }

  return context;
}

interface ApprovalFlowProviderProps {
  children: ReactNode;
}

const ApprovalFlowProvider = ({ children }: ApprovalFlowProviderProps) => {
  const [elements, setElements] = useState<ApprovalFlowInitialElement[]>([]);

  const onAddNodeCallback = () => {};

  return (
    <ApprovalFlowContext.Provider
      value={{ elements, setElements, onAddNodeCallback }}
    >
      {children}
    </ApprovalFlowContext.Provider>
  );
};

export { ApprovalFlowProvider, useApprovalFlowContext };
