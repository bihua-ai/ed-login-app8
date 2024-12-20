import React, { useEffect, useRef } from 'react';
import { BarChart2, Network, FileText, MessageSquarePlus } from 'lucide-react';
import { MatrixClientUtil } from '../utils/matrixClient';
import { ReportGenerator } from '../utils/reportGenerator';

interface ChatActionButtonsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

interface ButtonConfig {
  id: string;
  tooltip: string;
  icon: React.ComponentType<any>;
  onClick?: () => Promise<void>;
}

export default function ChatActionButtons({ onAction, disabled = false }: ChatActionButtonsProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Create hidden iframe to load chart utilities
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/pages/page2.html';
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      if (iframe && document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  const generateAndSendReport = async () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) {
      throw new Error('Chart utilities not loaded');
    }

    try {
      const iframeWindow = iframeRef.current.contentWindow;
      
      // Wait for utilities to be available
      await new Promise<void>((resolve) => {
        const checkUtilities = () => {
          if (iframeWindow.DataGenerator && iframeWindow.ChartAnalyzer) {
            resolve();
          } else {
            setTimeout(checkUtilities, 100);
          }
        };
        checkUtilities();
      });

      const timeData = iframeWindow.DataGenerator.generateTimeData();
      const sensorData = iframeWindow.DataGenerator.generateSensorData(timeData);
      
      const frequency = iframeWindow.ChartAnalyzer.getHighEnergyFrequency(timeData, sensorData, 7);
      const counts = iframeWindow.ChartAnalyzer.countHighEnergyEvents(
        timeData,
        sensorData,
        new Date('2023-01-01'),
        new Date('2023-01-31'),
        0.8
      );

      const report = ReportGenerator.generateReport(frequency, counts);
      await MatrixClientUtil.sendMessage(report);
    } catch (err) {
      console.error('Error generating report:', err);
      throw new Error('Failed to generate and send report');
    }
  };

  const leftButtons: ButtonConfig[] = [
    { id: 'analyze', tooltip: '数据分析', icon: BarChart2 },
    { id: 'graph', tooltip: '图谱绘制', icon: Network },
    { 
      id: 'report', 
      tooltip: '生成报告', 
      icon: FileText,
      onClick: generateAndSendReport 
    },
  ];

  const rightButtons: ButtonConfig[] = [
    { id: 'new', tooltip: '新建对话', icon: MessageSquarePlus },
  ];

  const renderButton = ({ id, tooltip, icon: Icon, onClick }: ButtonConfig) => (
    <button
      key={id}
      onClick={async () => {
        try {
          if (onClick) {
            await onClick();
          }
          onAction(id);
        } catch (error) {
          console.error(`Error in button action ${id}:`, error);
        }
      }}
      disabled={disabled}
      title={tooltip}
      className={`p-2 rounded-md transition-colors ${
        disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
      }`}
      aria-label={tooltip}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="flex justify-between mb-2">
      <div className="flex gap-2">
        {leftButtons.map(renderButton)}
      </div>
      <div className="flex gap-2">
        {rightButtons.map(renderButton)}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    ChartAnalyzer: any;
    DataGenerator: any;
  }
}