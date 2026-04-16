import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TournamentGrid } from './components/TournamentGrid';
import { SupportButton } from './components/SupportButton';
import { TournamentFilters } from './components/TournamentFilters';
import { QuickAccess } from './components/QuickAccess';
import { RegistrationModal } from './components/RegistrationModal';
import type { RegistrationData } from './components/RegistrationModal';
import { TournamentWorkspace } from './components/TournamentWorkspace';
import { TaskListModal } from './components/TaskListModal';
import { UserRegistrationModal } from './components/UserRegistrationModal';
import { UserLoginModal } from './components/UserLoginModal';
import { ResultsModal } from './components/ResultsModal';
import { INITIAL_TOURNAMENTS } from './data/tournaments';
import { loginUser, registerUser } from './lib/auth';
import { clearStoredSession, loadStoredSession, persistSession } from './lib/session';
import type { Tournament } from './types/tournament';
import type { AppLanguage, AppUser, UserLoginData, UserRegistrationData, UserSettings } from './types/user';

function App() {
  const [primaryColor, setPrimaryColor] = useState('#5B2EFF');
  const [language, setLanguage] = useState<AppLanguage>('UA');
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [currentUserSettings, setCurrentUserSettings] = useState<UserSettings | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);
  const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState(false);
  const [isUserLoginModalOpen, setIsUserLoginModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [currentView, setCurrentView] = useState<'tournaments' | 'workspace'>('tournaments');
  const [allTournaments, setAllTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);

  useEffect(() => {
    const storedSession = loadStoredSession();

    if (!storedSession) {
      return;
    }

    setCurrentUser(storedSession.user);
    setCurrentUserSettings(storedSession.settings);
    setPrimaryColor(storedSession.settings.primaryColor);
    setLanguage(storedSession.settings.language as AppLanguage);
  }, []);

  const getFilteredTournaments = () => {
    if (selectedFilters.length === 0) {
      return allTournaments;
    }

    const filterMap: Record<string, Tournament['status']> = {
      running: 'active',
      registration: 'upcoming',
      finished: 'completed',
    };

    return allTournaments.filter((tournament) =>
      selectedFilters.some((filter) => filterMap[filter] === tournament.status),
    );
  };

  const handleTournamentRegistration = (data: RegistrationData) => {
    console.log('Tournament registration data:', data);

    if (!selectedTournament) {
      return;
    }

    setAllTournaments((previousTournaments) =>
      previousTournaments.map((tournament) =>
        tournament.id === selectedTournament.id
          ? { ...tournament, isRegistered: true }
          : tournament,
      ),
    );
  };

  const applyAuthenticatedUser = (user: AppUser, settings: UserSettings) => {
    setCurrentUser(user);
    setCurrentUserSettings(settings);
    setPrimaryColor(settings.primaryColor);
    setLanguage(settings.language as AppLanguage);
    persistSession(user, settings);
  };

  const handleUserRegistration = async (data: UserRegistrationData) => {
    const account = await registerUser(data);

    applyAuthenticatedUser(account.user as AppUser, account.settings as UserSettings);
    setIsUserRegistrationModalOpen(false);
  };

  const handleUserLogin = async (data: UserLoginData) => {
    const account = await loginUser(data);

    applyAuthenticatedUser(account.user as AppUser, account.settings as UserSettings);
    setIsUserLoginModalOpen(false);
  };

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    setCurrentUserSettings((previousSettings) =>
      previousSettings
        ? (() => {
            const nextSettings = {
              ...previousSettings,
              primaryColor: color,
            };

            if (currentUser) {
              persistSession(currentUser, nextSettings);
            }

            return nextSettings;
          })()
        : previousSettings,
    );
  };

  const handleLanguageChange = (nextLanguage: AppLanguage) => {
    setLanguage(nextLanguage);
    setCurrentUserSettings((previousSettings) =>
      previousSettings
        ? (() => {
            const nextSettings = {
              ...previousSettings,
              language: nextLanguage,
            };

            if (currentUser) {
              persistSession(currentUser, nextSettings);
            }

            return nextSettings;
          })()
        : previousSettings,
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentUserSettings(null);
    clearStoredSession();
  };

  const handleJoinClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsTaskListModalOpen(true);
  };

  const handleRegisterClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsRegistrationModalOpen(true);
  };

  const handleResultsClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsResultsModalOpen(true);
  };

  const handleTaskSelect = () => {
    setIsTaskListModalOpen(false);
    setCurrentView('workspace');
  };

  const handleBackToTournaments = () => {
    setCurrentView('tournaments');
    setSelectedTournament(null);
  };

  const filteredTournaments = getFilteredTournaments();

  if (currentView === 'workspace' && selectedTournament) {
    return (
      <div className="min-h-screen bg-[#0D0D0F]">
        <Header
          currentUser={currentUser}
          currentUserSettings={currentUserSettings}
          primaryColor={primaryColor}
          onColorChange={handleColorChange}
          userStatus={null}
          language={language}
          onLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
        />
        <TournamentWorkspace
          tournament={selectedTournament}
          primaryColor={primaryColor}
          onBack={handleBackToTournaments}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <Header
        currentUser={currentUser}
        currentUserSettings={currentUserSettings}
        primaryColor={primaryColor}
        onColorChange={handleColorChange}
        userStatus={null}
        onRegisterClick={() => setIsUserRegistrationModalOpen(true)}
        onLoginClick={() => setIsUserLoginModalOpen(true)}
        language={language}
        onLanguageChange={handleLanguageChange}
        onLogout={handleLogout}
      />

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex gap-6">
          <div className="flex-1">
            <TournamentGrid
              tournaments={filteredTournaments}
              primaryColor={primaryColor}
              onRegisterClick={handleRegisterClick}
              onJoinClick={handleJoinClick}
              onResultsClick={handleResultsClick}
            />
          </div>

          <div className="w-[300px]">
            <QuickAccess primaryColor={primaryColor} />
            <TournamentFilters
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              primaryColor={primaryColor}
            />
          </div>
        </div>
      </main>

      <SupportButton primaryColor={primaryColor} />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegister={handleTournamentRegistration}
        primaryColor={primaryColor}
      />

      <TaskListModal
        isOpen={isTaskListModalOpen}
        onClose={() => setIsTaskListModalOpen(false)}
        onTaskSelect={handleTaskSelect}
        primaryColor={primaryColor}
        tournamentTitle={selectedTournament?.title || ''}
        tournamentDescription={selectedTournament?.description}
      />

      <UserRegistrationModal
        isOpen={isUserRegistrationModalOpen}
        onClose={() => setIsUserRegistrationModalOpen(false)}
        onRegister={handleUserRegistration}
        primaryColor={primaryColor}
        language={language}
      />

      <UserLoginModal
        isOpen={isUserLoginModalOpen}
        onClose={() => setIsUserLoginModalOpen(false)}
        onLogin={handleUserLogin}
        primaryColor={primaryColor}
        language={language}
      />

      <ResultsModal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        primaryColor={primaryColor}
        tournamentTitle={selectedTournament?.title || ''}
      />
    </div>
  );
}

export default App;
