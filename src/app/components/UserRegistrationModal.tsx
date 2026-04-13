import { X } from 'lucide-react';
import { useState } from 'react';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: UserRegistrationData) => void;
  primaryColor: string;
}

export interface UserRegistrationData {
  fullName: string;
  username: string;
  password: string;
  email: string;
  birthDate: string;
  school?: string;
}

export function UserRegistrationModal({ 
  isOpen, 
  onClose, 
  onRegister, 
  primaryColor 
}: UserRegistrationModalProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [school, setSchool] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!fullName.trim()) {
      newErrors.push('ПІБ обов\'язкове');
    }

    if (!username.trim() || username.length < 3) {
      newErrors.push('Логін повинен містити мінімум 3 символи');
    }

    if (!password || password.length < 6) {
      newErrors.push('Пароль повинен містити мінімум 6 символів');
    }

    if (!email.trim() || !email.includes('@')) {
      newErrors.push('Email обов\'язковий та має бути коректним');
    }

    if (!birthDate) {
      newErrors.push('Дата народження обов\'язкова');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onRegister({
        fullName,
        username,
        password,
        email,
        birthDate,
        school: school || undefined
      });
      onClose();
      // Reset form
      setFullName('');
      setUsername('');
      setPassword('');
      setEmail('');
      setBirthDate('');
      setSchool('');
      setErrors([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative bg-[#111115] rounded-2xl border border-[#1a1a1f] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${primaryColor}40`
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111115] border-b border-[#1a1a1f] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[#EDEDED] font-bold text-2xl mb-1">Реєстрація</h2>
            <p className="text-[#9CA3AF] text-sm">
              Створіть свій обліковий запис
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              {errors.map((error, idx) => (
                <p key={idx} className="text-red-400 text-sm">{error}</p>
              ))}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              ПІБ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Введіть повне ім'я"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: fullName ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Логін <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введіть логін"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: username ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Пароль <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: password ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: email ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Дата народження <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: birthDate ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* School (Optional) */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Школа <span className="text-[#9CA3AF] text-sm font-normal">(опціонально)</span>
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Назва навчального закладу"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: school ? primaryColor : '#1a1a1f'
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Зареєструватися
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
