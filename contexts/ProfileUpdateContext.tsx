'use client';

import type React from 'react';
import { type ReactNode, createContext, useContext, useState } from 'react';

interface ProfileUpdateContextType {
  isProfileUpdated: boolean;
  setIsProfileUpdated: (updated: boolean) => void;
}

const ProfileUpdateContext = createContext<ProfileUpdateContextType | undefined>(undefined);

export const useProfileUpdate = () => {
  const context = useContext(ProfileUpdateContext);
  if (!context) {
    throw new Error('useProfileUpdate must be used within a ProfileUpdateProvider');
  }
  return context;
};

interface ProfileUpdateProviderProps {
  children: ReactNode;
}

export const ProfileUpdateProvider: React.FC<ProfileUpdateProviderProps> = ({ children }) => {
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  return (
    <ProfileUpdateContext.Provider value={{ isProfileUpdated, setIsProfileUpdated }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
