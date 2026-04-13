import { X, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: RegistrationData) => void;
  primaryColor: string;
  maxMembers?: number;
}

export interface RegistrationData {
  teamName: string;
  captain: {
    fullName: string;
    email: string;
  };
  members: TeamMember[];
  city?: string;
  contact?: string;
}

export function RegistrationModal({ 
  isOpen, 
  onClose, 
  onRegister, 
  primaryColor,
  maxMembers = 5 
}: RegistrationModalProps) {
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', fullName: '', email: '' },
    { id: '2', fullName: '', email: '' }
  ]);
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const addMember = () => {
    if (members.length < maxMembers) {
      setMembers([...members, { id: Date.now().toString(), fullName: '', email: '' }]);
    }
  };

  const removeMember = (id: string) => {
    if (members.length > 2) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMember = (id: string, field: 'fullName' | 'email', value: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!teamName.trim()) {
      newErrors.push('Назва команди обов\'язкова');
    }

    if (!captainName.trim()) {
      newErrors.push('ПІБ капітана обов\'язкове');
    }

    if (!captainEmail.trim() || !captainEmail.includes('@')) {
      newErrors.push('Email капітана обов\'язковий та має бути коректним');
    }

    // Check all members have required fields
    const incompleteMember = members.find(m => !m.fullName.trim() || !m.email.trim() || !m.email.includes('@'));
    if (incompleteMember) {
      newErrors.push('Всі учасники повинні мати ПІБ та коректний email');
    }

    // Check unique emails
    const allEmails = [captainEmail, ...members.map(m => m.email)].filter(e => e.trim());
    const uniqueEmails = new Set(allEmails);
    if (allEmails.length !== uniqueEmails.size) {
      newErrors.push('Email повинні бути унікальними в межах команди');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onRegister({
        teamName,
        captain: { fullName: captainName, email: captainEmail },
        members,
        city: city || undefined,
        contact: contact || undefined
      });
      onClose();
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
        className="relative bg-[#111115] rounded-2xl border border-[#1a1a1f] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          boxShadow: `0 0 60px ${primaryColor}40`
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111115] border-b border-[#1a1a1f] p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-[#EDEDED] font-bold text-2xl mb-1">Реєстрація команди</h2>
            <p className="text-[#9CA3AF] text-sm">
              Команда може самостійно зареєструватися між датами реєстрації.
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              {errors.map((error, idx) => (
                <p key={idx} className="text-red-400 text-sm">{error}</p>
              ))}
            </div>
          )}

          {/* Team Name */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-2 block">
              Назва команди <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Введіть назву команди"
              className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
              style={{
                borderColor: teamName ? primaryColor : '#1a1a1f'
              }}
              required
            />
          </div>

          {/* Captain */}
          <div>
            <label className="text-[#EDEDED] font-semibold mb-3 block">
              Капітан <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="ПІБ капітана"
                className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                style={{
                  borderColor: captainName ? primaryColor : '#1a1a1f'
                }}
                required
              />
              <input
                type="email"
                value={captainEmail}
                onChange={(e) => setCaptainEmail(e.target.value)}
                placeholder="Email капітана"
                className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                style={{
                  borderColor: captainEmail ? primaryColor : '#1a1a1f'
                }}
                required
              />
            </div>
          </div>

          {/* Members */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[#EDEDED] font-semibold">
                Учасники (мін. 2, макс. {maxMembers}) <span className="text-red-400">*</span>
              </label>
              {members.length < maxMembers && (
                <button
                  type="button"
                  onClick={addMember}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{ 
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor 
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Додати
                </button>
              )}
            </div>
            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={member.id} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={member.fullName}
                      onChange={(e) => updateMember(member.id, 'fullName', e.target.value)}
                      placeholder={`ПІБ учасника ${index + 1}`}
                      className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: member.fullName ? primaryColor : '#1a1a1f'
                      }}
                      required
                    />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateMember(member.id, 'email', e.target.value)}
                      placeholder={`Email учасника ${index + 1}`}
                      className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: member.email ? primaryColor : '#1a1a1f'
                      }}
                      required
                    />
                  </div>
                  {members.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="p-3 text-[#9CA3AF] hover:text-red-400 transition-colors duration-150"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="pt-4 border-t border-[#1a1a1f] space-y-4">
            <div>
              <label className="text-[#EDEDED] font-semibold mb-2 block">
                Місто / Школа / Організація <span className="text-[#9CA3AF] text-sm font-normal">(опціонально)</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Введіть місто або організацію"
                className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                style={{
                  borderColor: city ? primaryColor : '#1a1a1f'
                }}
              />
            </div>

            <div>
              <label className="text-[#EDEDED] font-semibold mb-2 block">
                Telegram / Discord <span className="text-[#9CA3AF] text-sm font-normal">(опціонально)</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@username або посилання"
                className="w-full bg-[#0D0D0F] text-[#EDEDED] px-4 py-3 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                style={{
                  borderColor: contact ? primaryColor : '#1a1a1f'
                }}
              />
            </div>
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
