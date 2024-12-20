import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatrixAuthService } from '../services/matrix-auth';
import type { MatrixCredentials, MatrixRegisterData } from '../types/matrix-auth';
import { useAuth } from '../contexts/AuthContext';

export function useMatrixAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleLogin = async (credentials: MatrixCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      // Validate server URL format
      if (!credentials.server) {
        throw new Error('请输入服务器地址');
      }
      if (!credentials.server.startsWith('http://') && !credentials.server.startsWith('https://')) {
        credentials.server = 'https://' + credentials.server;
      }

      const response = await MatrixAuthService.login(credentials);
      setAuth(response.access_token, response.user_id, response.home_server);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || '登录失败，请检查您的凭据');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: MatrixRegisterData) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setIsLoading(true);

    try {
      // Validate server URL format
      if (!data.server) {
        throw new Error('请输入服务器地址');
      }
      if (!data.server.startsWith('http://') && !data.server.startsWith('https://')) {
        data.server = 'https://' + data.server;
      }

      const response = await MatrixAuthService.register(data);
      navigate('/matrix/login', { 
        state: { 
          message: '注册成功，请登录',
          username: data.username
        }
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || '注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
    handleRegister
  };
}