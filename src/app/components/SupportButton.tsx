import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

interface SupportButtonProps {
  primaryColor: string;
}

export function SupportButton({ primaryColor }: SupportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support message submission
    console.log({ name, email, message });
    setMessage('');
    setName('');
    setEmail('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-200 hover:scale-110 z-50"
        style={{
          backgroundColor: primaryColor,
          boxShadow: `0 0 30px ${primaryColor}60`
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Support Panel */}
      {isOpen && (
        <div className="fixed bottom-8 right-28 w-[380px] bg-[#111115] rounded-xl border border-[#1a1a1f] shadow-2xl z-50 animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#EDEDED] font-semibold text-lg">Підтримка</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#9CA3AF] hover:text-[#EDEDED] transition-colors duration-150"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#9CA3AF] text-sm mb-2 block">Ім'я</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введіть ваше ім'я"
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-3 py-2.5 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: name ? primaryColor : '#1a1a1f'
                  }}
                  required
                />
              </div>

              <div>
                <label className="text-[#9CA3AF] text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-3 py-2.5 rounded-lg border border-[#1a1a1f] focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: email ? primaryColor : '#1a1a1f'
                  }}
                  required
                />
              </div>

              <div>
                <label className="text-[#9CA3AF] text-sm mb-2 block">Повідомлення</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишіть вашу проблему або питання..."
                  rows={5}
                  className="w-full bg-[#0D0D0F] text-[#EDEDED] px-3 py-2.5 rounded-lg border border-[#1a1a1f] focus:outline-none resize-none transition-all duration-200"
                  style={{
                    borderColor: message ? primaryColor : '#1a1a1f'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="w-4 h-4" />
                Надіслати
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#1a1a1f]">
              <p className="text-[#9CA3AF] text-xs text-center">
                Ми відповімо вам протягом 24 годин
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
