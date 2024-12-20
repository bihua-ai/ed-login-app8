import { createClient } from 'matrix-js-sdk';
import { formatMatrixUsername } from '../utils/matrix';
import type { MatrixCredentials, MatrixAuthResponse } from '../types/matrix-auth';

export class MatrixAuthService {
  static validateCredentials(credentials: MatrixCredentials) {
    if (!credentials.server) {
      throw new Error('请输入服务器地址');
    }
    if (!credentials.server.startsWith('http://') && !credentials.server.startsWith('https://')) {
      throw new Error('服务器地址必须以 http:// 或 https:// 开头');
    }
    if (!credentials.username) {
      throw new Error('请输入用户名');
    }
    if (!credentials.password) {
      throw new Error('请输入密码');
    }
  }

  static async login({ server, username, password }: MatrixCredentials): Promise<MatrixAuthResponse> {
    // Validate inputs first
    this.validateCredentials({ server, username, password });

    // Ensure server URL is properly formatted
    const baseUrl = server.endsWith('/') ? server.slice(0, -1) : server;
    const client = createClient({ baseUrl });
    
    try {
      // Format username with server domain
      const formattedUsername = formatMatrixUsername(username, baseUrl);
      
      // Attempt login
      const response = await client.login('m.login.password', {
        user: formattedUsername,
        password: password,
        device_id: 'BIHUA_WEB_' + Math.random().toString(36).substring(2, 15),
        initial_device_display_name: 'Bihua Web Client'
      });

      if (!response?.access_token) {
        throw new Error('登录失败：未收到访问令牌');
      }

      return {
        access_token: response.access_token,
        device_id: response.device_id,
        user_id: response.user_id,
        home_server: baseUrl
      };
    } catch (error: any) {
      // Handle specific Matrix error codes
      if (error.errcode === 'M_FORBIDDEN') {
        throw new Error('用户名或密码错误');
      }
      if (error.errcode === 'M_USER_DEACTIVATED') {
        throw new Error('此账号已被停用');
      }
      if (error.name === 'ConnectionError') {
        throw new Error('无法连接到服务器，请检查服务器地址是否正确');
      }
      
      // Generic error with more details
      throw new Error(error.message || '登录失败，请稍后重试');
    } finally {
      client.stopClient();
    }
  }

  static async register({ server, username, password }: MatrixCredentials): Promise<MatrixAuthResponse> {
    // Validate inputs first
    this.validateCredentials({ server, username, password });

    // Ensure server URL is properly formatted
    const baseUrl = server.endsWith('/') ? server.slice(0, -1) : server;
    const client = createClient({ baseUrl });
    
    try {
      // Extract clean username for registration
      const cleanUsername = username.replace(/^@/, '').split(':')[0];
      
      // Check username availability
      try {
        const available = await client.isUsernameAvailable(cleanUsername);
        if (!available) {
          throw new Error('此用户名已被使用');
        }
      } catch (error: any) {
        if (error.errcode === 'M_USER_IN_USE') {
          throw new Error('此用户名已被使用');
        }
        throw error;
      }

      // Attempt registration
      const response = await client.register(
        cleanUsername,
        password,
        undefined,
        {
          initial_device_display_name: 'Bihua Web Client'
        }
      );

      if (!response?.access_token) {
        throw new Error('注册失败：未收到访问令牌');
      }

      return {
        access_token: response.access_token,
        device_id: response.device_id,
        user_id: response.user_id,
        home_server: baseUrl
      };
    } catch (error: any) {
      // Handle specific Matrix error codes
      if (error.errcode === 'M_USER_IN_USE') {
        throw new Error('此用户名已被使用');
      }
      if (error.errcode === 'M_INVALID_USERNAME') {
        throw new Error('用户名格式无效');
      }
      if (error.errcode === 'M_WEAK_PASSWORD') {
        throw new Error('密码强度不足');
      }
      if (error.name === 'ConnectionError') {
        throw new Error('无法连接到服务器，请检查服务器地址是否正确');
      }
      
      // Generic error with more details
      throw new Error(error.message || '注册失败，请稍后重试');
    } finally {
      client.stopClient();
    }
  }
}