import React from 'react';
import { ExternalLink, BookOpen, School, GraduationCap, PenTool } from 'lucide-react';
import { PlatformCard } from '../../types/platform';

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

interface PlatformGridProps {
  onNavigate: (url: string) => void;
}

export default function PlatformGrid({ onNavigate }: PlatformGridProps) {
  return (
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
  );
}