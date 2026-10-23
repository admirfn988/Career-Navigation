import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CareerState, CareerStateInput } from '@workspace/api-client-react';
import { demoProfile, type Profile } from '../data/careers';
import { loadNavigatorState, NavigatorApiError, saveNavigatorState } from '../lib/navigator-api';

type Scenario = 'moderate' | 'fast';
type DatabaseStatus = 'checking' | 'connected' | 'saving' | 'unavailable';

type NavigatorContextValue = {
  profile: Profile;
  setProfile: (profile: Profile, isSample?: boolean) => void;
  profileIsSample: boolean;
  selectedCareerId: string | null;
  setSelectedCareerId: (id: string | null) => void;
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
  persistState: (state: CareerStateInput) => Promise<CareerState>;
  databaseStatus: DatabaseStatus;
  databaseMessage: string;
  statePersisted: boolean;
  stateLoaded: boolean;
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
  const [scenario, setScenarioState] = useState<Scenario>('moderate');
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus>('checking');
  const [databaseMessage, setDatabaseMessage] = useState('Checking the Flask API and MySQL connection.');
  const [statePersisted, setStatePersisted] = useState(false);
  const [stateLoaded, setStateLoaded] = useState(false);
  const changedDuringLoad = useRef(false);

  const setProfile = (nextProfile: Profile, isSample = false) => {
    changedDuringLoad.current = true;
    setStatePersisted(false);
    setProfileState(nextProfile);
    setProfileIsSample(isSample);
  };

  const setSelectedCareer = (id: string | null) => {
    changedDuringLoad.current = true;
    setStatePersisted(false);
    setSelectedCareerId(id);
  };

  const setScenario = (nextScenario: Scenario) => {
    changedDuringLoad.current = true;
    setStatePersisted(false);
    setScenarioState(nextScenario);
  };

  useEffect(() => {
    let active = true;
    loadNavigatorState()
      .then((remoteState) => {
        if (!active) return;
        if (!changedDuringLoad.current) {
          if (remoteState.profile) {
            setProfileState(remoteState.profile);
            setProfileIsSample(remoteState.profileIsSample);
          }
          setSelectedCareerId(remoteState.selectedCareerId);
          setScenarioState(remoteState.scenario);
          setStatePersisted(Boolean(remoteState.profile));
        }
        setDatabaseStatus('connected');
        setDatabaseMessage(
          remoteState.profile
            ? 'Saved navigator data loaded from MySQL for this browser.'
            : 'MySQL is connected. This browser has no saved profile yet.',
        );
      })
      .catch((error: unknown) => {
        if (!active) return;
        setDatabaseStatus('unavailable');
        setDatabaseMessage(
          error instanceof NavigatorApiError
            ? error.message
            : 'The app could not load saved state from the Flask API.',
        );
      })
      .finally(() => {
        if (active) setStateLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const persistState = async (nextState: CareerStateInput) => {
    setDatabaseStatus('saving');
    setDatabaseMessage('Saving this browser’s navigator state to MySQL.');
    try {
      const savedState = await saveNavigatorState(nextState);
      changedDuringLoad.current = true;
      if (savedState.profile) {
        setProfileState(savedState.profile);
        setProfileIsSample(savedState.profileIsSample);
      }
      setSelectedCareerId(savedState.selectedCareerId);
      setScenarioState(savedState.scenario);
      setStatePersisted(true);
      setDatabaseStatus('connected');
      setDatabaseMessage('Changes were written to MySQL.');
      return savedState;
    } catch (error) {
      setDatabaseStatus('unavailable');
      setDatabaseMessage(
        error instanceof NavigatorApiError
          ? error.message
          : 'The Flask API could not confirm that MySQL saved these changes.',
      );
      throw error;
    }
  };

  const profileReady = Boolean(profile.education.trim() && profile.skills.length && profile.interests.length);
  const value = useMemo(
    () => ({
      profile,
      setProfile,
      profileIsSample,
      selectedCareerId,
      setSelectedCareerId: setSelectedCareer,
      scenario,
      setScenario,
      persistState,
      databaseStatus,
      databaseMessage,
      statePersisted,
      stateLoaded,
      profileReady,
    }),
    [profile, profileIsSample, selectedCareerId, scenario, databaseStatus, databaseMessage, statePersisted, stateLoaded, profileReady],
  );
  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
}

export function useNavigator() {
  const value = useContext(NavigatorContext);
  if (!value) throw new Error('useNavigator must be used inside NavigatorProvider');
  return value;
}
