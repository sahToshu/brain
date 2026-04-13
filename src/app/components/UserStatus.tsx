interface UserStatusProps {
  status: 'admin' | 'team' | 'jury' | null;
}

export function UserStatus({ status }: UserStatusProps) {
  if (!status) return null;

  const statusConfig = {
    admin: {
      label: 'Admin',
      borderColor: '#EF4444',
      textColor: '#EF4444'
    },
    team: {
      label: 'Team',
      borderColor: '#3B82F6',
      textColor: '#3B82F6'
    },
    jury: {
      label: 'Jury',
      borderColor: '#10B981',
      textColor: '#10B981'
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      className="px-4 py-1.5 rounded-lg bg-[#0D0D0F] border-2 font-semibold text-sm"
      style={{
        borderColor: config.borderColor,
        color: config.textColor
      }}
    >
      {config.label}
    </div>
  );
}
