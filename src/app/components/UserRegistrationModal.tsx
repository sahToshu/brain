import { X } from 'lucide-react';
import { useState } from 'react';
import type { AppLanguage, UserRegistrationData } from '../types/user';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: UserRegistrationData) => void;
  primaryColor: string;
  language: AppLanguage;
}

export function UserRegistrationModal({
  isOpen,
  onClose,
  onRegister,
  primaryColor,
  language,
}: UserRegistrationModalProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [school, setSchool] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const copy = {
    UA: {
      title: 'Registration',
      subtitle: 'Create your CodeArena account',
      fullName: 'Full name',
      fullNamePlaceholder: 'Enter your full name',
      username: 'Username',
      usernamePlaceholder: 'Choose a username',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      email: 'Email',
      birthDate: 'Birth date',
      school: 'School',
      schoolPlaceholder: 'School or organization',
      optional: '(optional)',
      submit: 'Register',
      fullNameError: 'Full name is required',
      usernameError: 'Username must be at least 3 characters',
      passwordError: 'Password must be at least 6 characters',
      emailError: 'Please enter a valid email',
      birthDateError: 'Birth date is required',
    },
    EN: {
      title: 'Registration',
      subtitle: 'Create your CodeArena account',
      fullName: 'Full name',
      fullNamePlaceholder: 'Enter your full name',
      username: 'Username',
      usernamePlaceholder: 'Choose a username',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      email: 'Email',
      birthDate: 'Birth date',
      school: 'School',
      schoolPlaceholder: 'School or organization',
      optional: '(optional)',
      submit: 'Register',
      fullNameError: 'Full name is required',
      usernameError: 'Username must be at least 3 characters',
      passwordError: 'Password must be at least 6 characters',
      emailError: 'Please enter a valid email',
      birthDateError: 'Birth date is required',
    },
  }[language];

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!fullName.trim()) {
      newErrors.push(copy.fullNameError);
    }

    if (!username.trim() || username.length < 3) {
      newErrors.push(copy.usernameError);
    }

    if (!password || password.length < 6) {
      newErrors.push(copy.passwordError);
    }

    if (!email.trim() || !email.includes('@')) {
      newErrors.push(copy.emailError);
    }

    if (!birthDate) {
      newErrors.push(copy.birthDateError);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const resetForm = () => {
    setFullName('');
    setUsername('');
    setPassword('');
    setEmail('');
    setBirthDate('');
    setSchool('');
    setErrors([]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onRegister({
      fullName,
      username,
      password,
      email,
      birthDate,
      school: school || undefined,
    });
    onClose();
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-[#111115] rounded-2xl border border-[#1a1a1f] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${primaryColor}40`,
        }}
      >
        <div className="sticky top-0 bg-[#111115] border-b border-[#1a1a1f] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[#EDEDED] font-bold text-2xl mb-1">{copy.title}</h2>
            <p className="text-[#9CA3AF] text-sm">{copy.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-400 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.fullName} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={copy.fullNamePlaceholder}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: fullName ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.username} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder={copy.usernamePlaceholder}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: username ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.password} <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={copy.passwordPlaceholder}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: password ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.email} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: email ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.birthDate} <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: birthDate ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              {copy.school} <span className="text-[#9CA3AF] text-sm font-normal">{copy.optional}</span>
            </label>
            <input
              type="text"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              placeholder={copy.schoolPlaceholder}
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{ borderColor: school ? primaryColor : '#1a1a1f' }}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {copy.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
