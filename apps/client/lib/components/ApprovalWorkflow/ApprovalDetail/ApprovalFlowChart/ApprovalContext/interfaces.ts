import { Dispatch, SetStateAction } from 'react';

interface ContextValue {
  elements: any[];
  setElements: Dispatch<SetStateAction<any[]>>;
  onAddNodeCallback: () => void;
}

export type { ContextValue };
