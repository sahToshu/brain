import { X } from 'lucide-react';
import { useState } from 'react';
import type { AppLanguage, UserLoginData } from '../types/user';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: UserLoginData) => Promise<void>;
  primaryColor: string;
  language: AppLanguage;
}

export function UserLoginModal({
  isOpen,
  onClose,
  onLogin,
  primaryColor,
  language,
}: UserLoginModalProps) {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = {
    UA: {
      title: 'Увійти',
      subtitle: 'Увійдіть у свій акаунт CodeArena',
      credential: 'Логін або email',
      credentialPlaceholder: 'Введіть логін або email',
      password: 'Пароль',
      passwordPlaceholder: 'Введіть пароль',
      submit: 'Увійти',
      credentialError: 'Вкажіть логін або email',
      passwordError: 'Пароль має містити щонайменше 8 символів',
      genericError: 'Не вдалося увійти',
    },
    EN: {
      title: 'Login',
      subtitle: 'Sign in to your CodeArena account',
      credential: 'Username or email',
      credentialPlaceholder: 'Enter username or email',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      submit: 'Login',
      credentialError: 'Username or email is required',
      passwordError: 'Password must be at least 8 characters long',
      genericError: 'Unable to log in',
    },
  }[language];

  if (!isOpen) {
    return null;
  }

  const validateForm = (): boolean => {
    const nextErrors: string[] = [];

    if (!credential.trim()) {
      nextErrors.push(copy.credentialError);
    }

    if (!password || password.length < 8) {
      nextErrors.push(copy.passwordError);
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const resetForm = () => {
    setCredential('');
    setPassword('');
    setErrors([]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onLogin({
        credential,
        password,
      });
      onClose();
      resetForm();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : copy.genericError]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl border border-[#1a1a1f] bg-[#111115] shadow-2xl"
        style={{ boxShadow: `0 0 60px ${primaryColor}40` }}
      >
        <div className="flex items-center justify-between border-b border-[#1a1a1f] p-6">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-[#EDEDED]">{copy.title}</h2>
            <p className="text-sm text-[#9CA3AF]">{copy.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] transition-colors duration-150 hover:text-[#EDEDED]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {errors.length > 0 && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div>
            <label className="mb-2 block font-semibold text-[#EDEDED]">
              {copy.credential} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={credential}
              onChange={(event) => setCredential(event.target.value)}
              placeholder={copy.credentialPlaceholder}
              className="w-full rounded-lg border border-[#1a1a1f] bg-[#0D0D0F] px-4 py-3 text-[#EDEDED] transition-all duration-200 focus:outline-none"
              style={{ borderColor: credential ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#EDEDED]">
              {copy.password} <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={copy.passwordPlaceholder}
              className="w-full rounded-lg border border-[#1a1a1f] bg-[#0D0D0F] px-4 py-3 text-[#EDEDED] transition-all duration-200 focus:outline-none"
              style={{ borderColor: password ? primaryColor : '#1a1a1f' }}
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg py-3.5 font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? `${copy.submit}...` : copy.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
