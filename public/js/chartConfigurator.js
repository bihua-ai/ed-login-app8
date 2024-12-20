// Chart configuration utilities
export const ChartConfigurator = {
    createEnergyOption(timeData, sensorData) {
        return {
            title: {
                text: '能量趋势',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['UHV', 'TEV', 'AE'],
                left: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            axisPointer: {
                link: [{
                    xAxisIndex: 'all'
                }]
            },
            dataZoom: [{
                show: true,
                realtime: true,
                start: 0,
                end: 30,
                xAxisIndex: [0]
            }, {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 30,
                xAxisIndex: [0]
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: true },
                data: timeData,
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            yAxis: [{
                type: 'value',
                max: 1.5,
                axisLabel: {
                    show: true
                },
                splitLine: {
                    show: true
                }
            }],
            series: [{
                name: 'UHV',
                type: 'line',
                symbolSize: 8,
                data: sensorData.uhvData
            }, {
                name: 'TEV',
                type: 'line',
                symbolSize: 8,
                data: sensorData.tevData
            }, {
                name: 'AE',
                type: 'line',
                symbolSize: 8,
                data: sensorData.aeData
            }]
        };
    },

    createFreqOption(frequencyData) {
        const maxFreqValue = Math.max(
            ...frequencyData.uhvDataFreq,
            ...frequencyData.tevDataFreq,
            ...frequencyData.aeDataFreq
        );

        return {
            title: {
                text: '频次趋势',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['UHV', 'TEV', 'AE'],
                left: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            dataZoom: [{
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0]
            }, {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0]
            }],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: frequencyData.dateLabels,
                axisLabel: {
                    formatter: value => value.substring(5)
                }
            },
            yAxis: {
                type: 'value',
                max: Math.ceil(maxFreqValue * 1.1),
                axisLabel: {
                    show: true
                },
                splitLine: {
                    show: true
                }
            },
            series: [{
                name: 'UHV',
                type: 'line',
                data: frequencyData.uhvDataFreq,
                symbolSize: 8,
                lineStyle: {
                    width: 2
                }
            }, {
                name: 'TEV',
                type: 'line',
                data: frequencyData.tevDataFreq,
                symbolSize: 8,
                lineStyle: {
                    width: 2
                }
            }, {
                name: 'AE',
                type: 'line',
                data: frequencyData.aeDataFreq,
                symbolSize: 8,
                lineStyle: {
                    width: 2
                }
            }]
        };
    }
};