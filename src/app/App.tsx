import { useState } from 'react';
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
import type { UserRegistrationData } from './components/UserRegistrationModal';
import { ResultsModal } from './components/ResultsModal';

interface Tournament {
  id: number;
  title: string;
  status: 'active' | 'upcoming' | 'completed';
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  taskCount: number;
  participants: number;
  isRegistered: boolean;
  tag?: string;
}

function App() {
  const [primaryColor, setPrimaryColor] = useState('#5B2EFF');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [userStatus] = useState<'admin' | 'team' | 'jury' | null>('team');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);
  const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState(false);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [currentView, setCurrentView] = useState<'tournaments' | 'workspace'>('tournaments');
  const [language, setLanguage] = useState<'UA' | 'EN'>('UA');

  // All tournaments in one array
  const [allTournaments, setAllTournaments] = useState<Tournament[]>([
    {
      id: 1,
      title: 'Spring Algorithm Challenge 2026',
      status: 'active' as const,
      description: 'Змагання з алгоритмів та структур даних для досвідчених програмістів',
      startDate: '20 Бер',
      endDate: '27 Бер',
      duration: '7 днів',
      taskCount: 8,
      participants: 1247,
      isRegistered: false,
      tag: 'Algorithms'
    },
    {
      id: 2,
      title: 'Dynamic Programming Marathon',
      status: 'active' as const,
      description: 'Інтенсивний курс з динамічного програмування з практичними задачами',
      startDate: '22 Бер',
      endDate: '29 Бер',
      duration: '7 днів',
      taskCount: 10,
      participants: 892,
      isRegistered: true,
      tag: 'DP'
    },
    {
      id: 3,
      title: 'Graph Theory Sprint',
      status: 'active' as const,
      description: 'Поглиблене вивчення теорії графів та її застосування',
      startDate: '23 Бер',
      endDate: '30 Бер',
      duration: '7 днів',
      taskCount: 6,
      participants: 654,
      isRegistered: false,
      tag: 'Graphs'
    },
    {
      id: 4,
      title: 'Binary Search Mastery',
      status: 'active' as const,
      description: 'Від базових до просунутих технік бінарного пошуку',
      startDate: '21 Бер',
      endDate: '25 Бер',
      duration: '4 дні',
      taskCount: 5,
      participants: 432,
      isRegistered: false,
      tag: 'Search'
    },
    {
      id: 5,
      title: 'Weekly Code Battle #42',
      status: 'upcoming' as const,
      description: 'Щотижневе змагання з різноманітними алгоритмічними задачами',
      startDate: '28 Бер',
      endDate: '28 Бер',
      duration: '3 години',
      taskCount: 4,
      participants: 2341,
      isRegistered: true,
      tag: 'Mixed'
    },
    {
      id: 6,
      title: 'String Algorithms Workshop',
      status: 'upcoming' as const,
      description: 'Практичний воркшоп з алгоритмів обробки рядків',
      startDate: '30 Бер',
      endDate: '5 Квіт',
      duration: '6 днів',
      taskCount: 7,
      participants: 543,
      isRegistered: false,
      tag: 'Strings'
    },
    {
      id: 7,
      title: 'Advanced Data Structures',
      status: 'upcoming' as const,
      description: 'Дослідження складних структур даних: Segment Tree, Fenwick Tree та інші',
      startDate: '1 Квіт',
      endDate: '8 Квіт',
      duration: '7 днів',
      taskCount: 9,
      participants: 721,
      isRegistered: false,
      tag: 'Data Structures'
    },
    {
      id: 8,
      title: 'Greedy Algorithms Challenge',
      status: 'upcoming' as const,
      description: 'Турнір з жадібними алгоритмами та оптимізаційними задачами',
      startDate: '3 Квіт',
      endDate: '7 Квіт',
      duration: '4 дні',
      taskCount: 6,
      participants: 389,
      isRegistered: false,
      tag: 'Greedy'
    },
    {
      id: 9,
      title: 'Winter Code Sprint 2026',
      status: 'completed' as const,
      description: 'Інтенсивний зимовий марафон з програмування',
      startDate: '1 Лют',
      endDate: '15 Лют',
      duration: '14 днів',
      taskCount: 12,
      participants: 3421,
      isRegistered: true,
      tag: 'Marathon'
    },
    {
      id: 10,
      title: 'Sorting Algorithms Contest',
      status: 'completed' as const,
      description: 'Змагання на знання та оптимізацію алгоритмів сортування',
      startDate: '10 Лют',
      endDate: '14 Лют',
      duration: '4 дні',
      taskCount: 5,
      participants: 1876,
      isRegistered: false,
      tag: 'Sorting'
    },
    {
      id: 11,
      title: 'Tree Traversal Tournament',
      status: 'completed' as const,
      description: 'Задачі на обхід та маніпуляцію з деревами',
      startDate: '5 Лют',
      endDate: '12 Лют',
      duration: '7 днів',
      taskCount: 8,
      participants: 1234,
      isRegistered: false,
      tag: 'Trees'
    },
    {
      id: 12,
      title: 'Backtracking Basics',
      status: 'completed' as const,
      description: 'Практичні задачі на техніку повернення назад',
      startDate: '1 Лют',
      endDate: '5 Лют',
      duration: '4 дні',
      taskCount: 6,
      participants: 987,
      isRegistered: false,
      tag: 'Backtracking'
    }
  ]);

  // Filter tournaments based on selected filters
  const getFilteredTournaments = () => {
    if (selectedFilters.length === 0) {
      return allTournaments;
    }

    const filterMap: Record<string, string> = {
      running: 'active',
      registration: 'upcoming',
      finished: 'completed'
    };

    return allTournaments.filter(tournament => 
      selectedFilters.some(filter => filterMap[filter] === tournament.status)
    );
  };

  const handleRegisterClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsRegistrationModalOpen(true);
  };

  const handleJoinClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsTaskListModalOpen(true);
  };

  const handleResultsClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsResultsModalOpen(true);
  };

  const handleTaskSelect = () => {
    setIsTaskListModalOpen(false);
    setCurrentView('workspace');
  };

  const handleRegistration = (data: RegistrationData) => {
    console.log('Registration data:', data);
    // Update tournament to registered status
    if (selectedTournament) {
      setAllTournaments(allTournaments.map(t => 
        t.id === selectedTournament.id ? { ...t, isRegistered: true } : t
      ));
    }
  };

  const handleUserRegistration = (data: UserRegistrationData) => {
    console.log('User registration data:', data);
  };

  const handleBackToTournaments = () => {
    setCurrentView('tournaments');
    setSelectedTournament(null);
  };

  const filteredTournaments = getFilteredTournaments();

  // Show workspace view if selected
  if (currentView === 'workspace' && selectedTournament) {
    return (
      <div className="min-h-screen bg-[#0D0D0F]">
        <Header 
          primaryColor={primaryColor} 
          onColorChange={setPrimaryColor}
          userStatus={userStatus}
          language={language}
          onLanguageChange={setLanguage}
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
        primaryColor={primaryColor} 
        onColorChange={setPrimaryColor}
        userStatus={userStatus}
        onRegisterClick={() => setIsUserRegistrationModalOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <TournamentGrid
              tournaments={filteredTournaments}
              primaryColor={primaryColor}
              onRegisterClick={handleRegisterClick}
              onJoinClick={handleJoinClick}
              onResultsClick={handleResultsClick}
            />
          </div>

          {/* Sidebar */}
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

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegister={handleRegistration}
        primaryColor={primaryColor}
      />

      {/* Task List Modal */}
      <TaskListModal
        isOpen={isTaskListModalOpen}
        onClose={() => setIsTaskListModalOpen(false)}
        onTaskSelect={handleTaskSelect}
        primaryColor={primaryColor}
        tournamentTitle={selectedTournament?.title || ''}
        tournamentDescription={selectedTournament?.description}
      />

      {/* User Registration Modal */}
      <UserRegistrationModal
        isOpen={isUserRegistrationModalOpen}
        onClose={() => setIsUserRegistrationModalOpen(false)}
        onRegister={handleUserRegistration}
        primaryColor={primaryColor}
      />

      {/* Results Modal */}
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
