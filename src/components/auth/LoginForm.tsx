import React from 'react';
import ServerInput from './ServerInput';
import UsernameInput from './UsernameInput';
import PasswordInput from '../form/PasswordInput';
import LoginButton from './LoginButton';
import type { MatrixCredentials } from '../../types/matrix-auth';

interface LoginFormProps {
  formData: MatrixCredentials;
  setFormData: React.Dispatch<React.SetStateAction<MatrixCredentials>>;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function LoginForm({ 
  formData, 
  setFormData, 
  isLoading, 
  error,
  onSubmit 
}: LoginFormProps) {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <ServerInput
            value={formData.server}
            onChange={(value) => setFormData(prev => ({ ...prev, server: value }))}
          />

          <UsernameInput
            value={formData.username}
            server={formData.server}
            onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
          />

          <PasswordInput
            id="password"
            label="密码"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="输入密码"
          />

          <LoginButton isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}