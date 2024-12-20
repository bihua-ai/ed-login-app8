export function formatMatrixUsername(username: string, serverName: string): string {
  // Remove any existing @user:server format
  const cleanUsername = username.replace(/^@/, '').split(':')[0];
  
  // Remove http(s):// and any paths from server name
  const cleanServer = serverName.replace(/^https?:\/\//, '').split('/')[0];
  
  return `@${cleanUsername}:${cleanServer}`;
}

export function parseMatrixUsername(userId: string): { username: string; server: string } {
  const match = userId.match(/^@([^:]+):(.+)$/);
  if (!match) {
    throw new Error('Invalid Matrix user ID format');
  }
  return {
    username: match[1],
    server: match[2]
  };
}