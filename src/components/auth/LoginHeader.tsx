import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex items-center justify-center space-x-4">
        <img src="/src/assets/bihua.png" alt="笔画" className="h-12 w-12" />
        <h2 className="text-3xl font-extrabold text-gray-900">笔画</h2>
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        还没有账号？{' '}
        <Link
          to="/matrix/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          立即注册
        </Link>
      </p>
    </div>
  );
}