import React from 'react';
import { ExternalLink, FileText, BookOpen, School, GraduationCap, PenTool } from 'lucide-react';

interface PlatformCard {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
  description: string;
}

const platforms: PlatformCard[] = [
  {
    name: '学习通',
    url: 'https://i.chaoxing.com/',
    icon: BookOpen,
    description: '超星学习通在线教学平台'
  },
  {
    name: '课堂派',
    url: 'https://www.ketangpai.com/',
    icon: School,
    description: '互动式课堂教学工具'
  },
  {
    name: '智慧树',
    url: 'https://www.zhihuishu.com/',
    icon: GraduationCap,
    description: '在线课程学习平台'
  },
  {
    name: '雨课堂',
    url: 'https://www.yuketang.cn/',
    icon: PenTool,
    description: '智能教学助手平台'
  }
];

interface WelcomePageProps {
  onNavigate: (url: string) => void;
  onGenerateReport: () => void;
}

export default function WelcomePage({ onNavigate, onGenerateReport }: WelcomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">欢迎使用教学辅助系统</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => onNavigate(platform.url)}
              className="flex items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {platform.name}
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {platform.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">达成度报告</h2>
            <p className="text-gray-500 mt-1">
              生成详细的教学达成度分析报告，帮助评估教学效果
            </p>
          </div>
          <button
            onClick={onGenerateReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            生成报告
          </button>
        </div>
      </div>
    </div>
  );
}