'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

interface FullProgramContextType {
  isFullProgram: boolean;
  setIsFullProgram: (isFullProgram: boolean) => void;
}

const FullProgramContext = createContext<FullProgramContextType | undefined>(undefined);

export const useFullProgram = () => {
  const context = useContext(FullProgramContext);
  if (!context) {
    throw new Error('useFullProgram must be used within a FullProgramProvider');
  }
  return context;
};

interface FullProgramProviderProps {
  children: ReactNode;
}

export const FullProgramProvider: React.FC<FullProgramProviderProps> = ({ children }) => {
  const [isFullProgram, setIsFullProgram] = useState(false);

  return (
    <FullProgramContext.Provider value={{ isFullProgram, setIsFullProgram }}>
      {children}
    </FullProgramContext.Provider>
  );
};
