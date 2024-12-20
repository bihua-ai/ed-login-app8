import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="p-3 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
      title="退出登录"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}