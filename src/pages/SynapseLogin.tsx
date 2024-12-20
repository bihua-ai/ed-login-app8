import React, { useState } from 'react';
import { useMatrixAuth } from '../hooks/useMatrixAuth';
import LoginHeader from '../components/auth/LoginHeader';
import LoginForm from '../components/auth/LoginForm';
import type { MatrixCredentials } from '../types/matrix-auth';

export default function SynapseLogin() {
  const { isLoading, error, handleLogin } = useMatrixAuth();
  const [formData, setFormData] = useState<MatrixCredentials>({
    server: '',
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginHeader />
      <LoginForm
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}