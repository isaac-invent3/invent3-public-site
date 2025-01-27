import { createContext, ReactNode, useContext, useState } from 'react';
import { ApprovalFlowElement, ContextValue } from './Interfaces';

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
  const [elements, setElements] = useState<ApprovalFlowElement[]>([]);

  return (
    <ApprovalFlowContext.Provider value={{ elements, setElements }}>
      {children}
    </ApprovalFlowContext.Provider>
  );
};

export { ApprovalFlowProvider, useApprovalFlowContext };
