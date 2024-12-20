interface AnalysisResult {
  uhvFrequency: number;
  tevFrequency: number;
  aeFrequency: number;
  totalDays: number;
  startDate: string;
  endDate: string;
}

interface EventCounts {
  uhv: number;
  tev: number;
  ae: number;
}

export class ReportGenerator {
  static generateReport(frequency: AnalysisResult, counts: EventCounts): string {
    return `设备状态分析报告：

过去7天高能量事件频率：
- UHV: ${frequency.uhvFrequency.toFixed(2)} 次/天
- TEV: ${frequency.tevFrequency.toFixed(2)} 次/天
- AE: ${frequency.aeFrequency.toFixed(2)} 次/天

2023年1月高能量事件统计 (>0.8)：
- UHV: ${counts.uhv} 次
- TEV: ${counts.tev} 次
- AE: ${counts.ae} 次

分析时间范围：
${new Date(frequency.startDate).toLocaleDateString()} - ${new Date(frequency.endDate).toLocaleDateString()}

建议：
${this.getRecommendation(frequency, counts)}`;
  }

  private static getRecommendation(frequency: AnalysisResult, counts: EventCounts): string {
    const totalFrequency = frequency.uhvFrequency + frequency.tevFrequency + frequency.aeFrequency;
    const totalCounts = counts.uhv + counts.tev + counts.ae;

    if (totalFrequency > 10 || totalCounts > 100) {
      return '建议：设备状态异常，需要立即检查维护。';
    } else if (totalFrequency > 5 || totalCounts > 50) {
      return '建议：设备需要关注，建议安排例行检查。';
    }
    return '建议：设备运行正常，继续保持当前维护计划。';
  }
}