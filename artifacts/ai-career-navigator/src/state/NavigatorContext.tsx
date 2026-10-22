import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { demoProfile, type Profile } from '../data/careers';

type NavigatorContextValue = {
  profile: Profile;
  setProfile: (profile: Profile, isSample?: boolean) => void;
  profileIsSample: boolean;
  selectedCareerId: string | null;
  setSelectedCareerId: (id: string | null) => void;
  profileReady: boolean;
};

const NavigatorContext = createContext<NavigatorContextValue | null>(null);

export function NavigatorProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>({
    ...demoProfile,
    skills: [...demoProfile.skills],
    interests: [...demoProfile.interests],
  });
  const [profileIsSample, setProfileIsSample] = useState(true);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const setProfile = (nextProfile: Profile, isSample = false) => {
    setProfileState(nextProfile);
    setProfileIsSample(isSample);
  };
  const profileReady = Boolean(profile.education.trim() && profile.skills.length && profile.interests.length);
  const value = useMemo(() => ({ profile, setProfile, profileIsSample, selectedCareerId, setSelectedCareerId, profileReady }), [profile, profileIsSample, selectedCareerId, profileReady]);
  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
}

export function useNavigator() {
  const value = useContext(NavigatorContext);
  if (!value) throw new Error('useNavigator must be used inside NavigatorProvider');
  return value;
}
