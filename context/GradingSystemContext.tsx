import React, { createContext, useContext } from 'react';
import { GradingSystem } from '@/app/types';
import useStorage from '@/hooks/useStorage';

type GradingSystemContextType = {
  gradingSystem: GradingSystem;
  updateGradingSystem: (system: GradingSystem) => Promise<void>;
};

const GradingSystemContext = createContext<GradingSystemContextType>({} as GradingSystemContextType);

export const GradingSystemProvider = ({ children }) => {
  const { settings, updateSettings } = useStorage();

  const updateGradingSystem = async (system: GradingSystem) => {
    await updateSettings({ gradingSystem: system });
  };

  return (
    <GradingSystemContext.Provider value={{ 
      gradingSystem: settings.gradingSystem, 
      updateGradingSystem 
    }}>
      {children}
    </GradingSystemContext.Provider>
  );
};

export const useGradingSystem = () => useContext(GradingSystemContext);