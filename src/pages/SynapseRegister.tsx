import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Server, User, UserPlus } from 'lucide-react';
import { useMatrixAuth } from '../hooks/useMatrixAuth';
import PasswordInput from '../components/form/PasswordInput';
import type { MatrixRegisterData } from '../types/matrix-auth';

export default function SynapseRegister() {
  const navigate = useNavigate();
  const { isLoading, error, handleRegister } = useMatrixAuth();
  const [formData, setFormData] = useState<MatrixRegisterData>({
    server: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-4">
          <img src="/src/assets/bihua.png" alt="笔画" className="h-12 w-12" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            注册账号
          </h2>
      </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          已有账号？{' '}
          <Link
            to="/matrix/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            立即登录
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="server" className="block text-sm font-medium text-gray-700">
                服务器地址
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="server"
                  value={formData.server}
                  onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your_username"
                />
              </div>
            </div>

            <PasswordInput
              id="password"
              label="密码"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <PasswordInput
              id="confirmPassword"
              label="确认密码"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? '两次输入的密码不一致'
                  : undefined
              }
            />

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    注册
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}