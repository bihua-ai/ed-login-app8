export interface MatrixCredentials {
  server: string;
  username: string;
  password: string;
}

export interface MatrixRegisterData extends MatrixCredentials {
  confirmPassword: string;
}

export interface MatrixAuthResponse {
  access_token: string;
  device_id: string;
  user_id: string;
  home_server: string;
}