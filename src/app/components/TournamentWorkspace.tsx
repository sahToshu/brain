import { Calendar, Clock, CheckSquare, Square, AlertCircle, Github, Youtube, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface TournamentWorkspaceProps {
  tournament: {
    id: number;
    title: string;
  };
  primaryColor: string;
  onBack: () => void;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export function TournamentWorkspace({ tournament, primaryColor, onBack }: TournamentWorkspaceProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', text: 'Реалізувати базову структуру проекту', completed: true },
    { id: '2', text: 'Додати систему автентифікації', completed: true },
    { id: '3', text: 'Створити API endpoints', completed: false },
    { id: '4', text: 'Реалізувати UI компоненти', completed: false },
    { id: '5', text: 'Додати тести', completed: false },
  ]);

  const [githubUrl, setGithubUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [liveDemo, setLiveDemo] = useState('');
  const [description, setDescription] = useState('');
  const [isDeadlinePassed] = useState(false);

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleSubmit = () => {
    // Handle submission
    console.log({ githubUrl, videoUrl, liveDemo, description });
  };

  const taskDeadline = new Date('2026-03-27T23:59:59');
  const now = new Date();
  const timeLeft = taskDeadline.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* Back Button */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад до турнірів
        </button>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pb-10">
        <div className="mb-6">
          <h1 className="text-[#EDEDED] font-bold text-3xl mb-2">{tournament.title}</h1>
          <p className="text-[#9CA3AF]">Робочий простір турніру</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Card - Task */}
          <div 
            className="bg-[#111115] rounded-2xl border border-[#1a1a1f] p-6 h-fit"
            style={{
              boxShadow: `0 0 40px ${primaryColor}20`
            }}
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#EDEDED] font-bold text-2xl">Завдання</h2>
                <span 
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor
                  }}
                >
                  Active
                </span>
              </div>
              
              <h3 className="text-[#EDEDED] font-semibold text-xl mb-3">
                Створіть платформу для онлайн навчання
              </h3>
              
              <p className="text-[#9CA3AF] leading-relaxed mb-4">
                Розробіть повнофункціональну платформу для онлайн навчання з можливістю створення курсів, 
                додавання уроків, тестування студентів та відстеження прогресу.
              </p>
            </div>

            {/* Технічні вимоги */}
            <div className="mb-6 pb-6 border-b border-[#1a1a1f]">
              <h4 className="text-[#EDEDED] font-semibold mb-3">Технологічні вимоги</h4>
              <ul className="space-y-2 text-[#9CA3AF] text-sm">
                <li className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <span>React 18+ з TypeScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <span>Backend: Node.js + Express або будь-який інший фреймворк</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <span>База даних: PostgreSQL або MongoDB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <span>Автентифікація та авторизація</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: primaryColor }}>•</span>
                  <span>Responsive дизайн</span>
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="mb-6 pb-6 border-b border-[#1a1a1f]">
              <h4 className="text-[#EDEDED] font-semibold mb-3">Must-have функціонал</h4>
              <div className="space-y-2">
                {checklist.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[#1a1a1f] transition-colors duration-150 text-left"
                  >
                    {item.completed ? (
                      <CheckSquare className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                    ) : (
                      <Square className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
                    )}
                    <span className={item.completed ? 'text-[#9CA3AF] line-through' : 'text-[#EDEDED]'}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Deadlines */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                <Calendar className="w-4 h-4" />
                <span>Старт: 20 Бер 2026, 10:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" style={{ color: daysLeft <= 2 ? '#EF4444' : primaryColor }} />
                <span style={{ color: daysLeft <= 2 ? '#EF4444' : primaryColor }}>
                  Дедлайн: 27 Бер 2026, 23:59 ({daysLeft} днів залишилось)
                </span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#1a1a1f]">
                <AlertCircle className="w-4 h-4 mt-0.5" style={{ color: primaryColor }} />
                <p className="text-[#9CA3AF] text-sm">
                  Всі зміни повинні бути збережені до дедлайну. Після закінчення часу редагування буде заблоковано.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card - Submission */}
          <div 
            className="bg-[#111115] rounded-2xl border border-[#1a1a1f] p-6 h-fit"
            style={{
              boxShadow: `0 0 40px ${primaryColor}20`
            }}
          >
            <div className="mb-6">
              <h2 className="text-[#EDEDED] font-bold text-2xl mb-2">Ваше рішення</h2>
              <p className="text-[#9CA3AF] text-sm">
                Заповніть всі обов'язкові поля для відправки рішення
              </p>
            </div>

            <form className="space-y-5">
              {/* GitHub */}
              <div>
                <label className="text-[#EDEDED] font-semibold mb-2 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub репозиторій
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  disabled={isDeadlinePassed}
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: githubUrl ? primaryColor : '#1a1a1f'
                  }}
                  required
                />
              </div>

              {/* Video Demo */}
              <div>
                <label className="text-[#EDEDED] font-semibold mb-2 flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  Відео-демо
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="YouTube або Google Drive посилання"
                  disabled={isDeadlinePassed}
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: videoUrl ? primaryColor : '#1a1a1f'
                  }}
                  required
                />
                <p className="text-[#9CA3AF] text-xs mt-1">
                  Завантажте відео на YouTube або Google Drive і вставте публічне посилання
                </p>
              </div>

              {/* Live Demo */}
              <div>
                <label className="text-[#EDEDED] font-semibold mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Live demo
                  <span className="text-[#9CA3AF] text-sm font-normal">(опціонально)</span>
                </label>
                <input
                  type="url"
                  value={liveDemo}
                  onChange={(e) => setLiveDemo(e.target.value)}
                  placeholder="https://your-app.vercel.app"
                  disabled={isDeadlinePassed}
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: liveDemo ? primaryColor : '#1a1a1f'
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[#EDEDED] font-semibold mb-2 flex items-center gap-2">
                  Короткий опис
                  <span className="text-[#9CA3AF] text-sm font-normal">(опціонально)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишіть ваше рішення, використані технології та особливості реалізації..."
                  disabled={isDeadlinePassed}
                  rows={6}
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: description ? primaryColor : '#1a1a1f'
                  }}
                />
                <p className="text-[#9CA3AF] text-xs mt-1">
                  1-2 абзаци про ваше рішення
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                {isDeadlinePassed ? (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                    <p className="text-red-400 font-medium">Дедлайн минув</p>
                    <p className="text-[#9CA3AF] text-sm mt-1">Редагування більше не доступне</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!githubUrl || !videoUrl}
                    className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Надіслати рішення
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#1a1a1f]">
                <AlertCircle className="w-4 h-4 mt-0.5 text-[#9CA3AF]" />
                <p className="text-[#9CA3AF] text-xs">
                  Ви можете редагувати ваше рішення до дедлайну. Всі зміни зберігаються автоматично.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
