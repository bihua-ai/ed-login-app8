import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WelcomeChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-500">
      <div className="bg-gray-50 p-8 rounded-lg text-center max-w-md">
        <div className="flex justify-center mb-4">
          <MessageSquare className="h-12 w-12" />
        </div>
        <h2 className="text-xl font-semibold mb-2">欢迎使用聊天系统</h2>
        {/* <p className="text-sm">
          从左侧列表选择一个聊天室开始对话
        </p> */}
      </div>
    </div>
  );
}