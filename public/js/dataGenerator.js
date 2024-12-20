// Data generation utilities
export const DataGenerator = {
    generateTimeData() {
        const timeData = [];
        const startDate = new Date('2023-01-01T00:00:00');
        const endDate = new Date('2023-12-31T23:30:00');

        while (startDate <= endDate) {
            const dateStr = startDate.toISOString().split('T')[0];
            const timeStr = startDate.toISOString().split('T')[1].slice(0, 5);
            timeData.push(dateStr + ' ' + timeStr);
            startDate.setMinutes(startDate.getMinutes() + 30);
        }

        return timeData;
    },

    getProbabilityFactor(date) {
        const totalDaysInYear = 365;
        const startOfYear = new Date('2023-01-01');
        const daysSinceStart = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
        return Math.min(0.8 + 0.1 * (daysSinceStart / totalDaysInYear), 1.0);
    },

    generateSensorData(timeData) {
        const uhvData = [];
        const tevData = [];
        const aeData = [];

        timeData.forEach(time => {
            const [, timeStr] = time.split(' ');
            const [hour, minute] = timeStr.split(':').map(Number);
            const currentDate = new Date(time.split(' ')[0]);
            const probabilityFactor = this.getProbabilityFactor(currentDate);

            const uhvValue = (hour === 10 && minute === 0) ? 0.95 :
                           (hour === 10 && minute === 15) ? 0.95 :
                           (Math.random() < probabilityFactor ? Math.random() * 0.65 + 0.3 : Math.random() * 0.4 + 0.3);

            const tevValue = (hour === 10 && minute === 15) ? 0.9 :
                           (Math.random() < probabilityFactor ? Math.random() * 0.57 + 0.33 : Math.random() * 0.33 + 0.33);

            const aeValue = (hour === 9 && minute === 45) ? 0.99 :
                          (Math.random() < probabilityFactor ? Math.random() * 0.64 + 0.35 : Math.random() * 0.35 + 0.35);

            uhvData.push(uhvValue);
            tevData.push(tevValue);
            aeData.push(aeValue);
        });

        return { uhvData, tevData, aeData };
    },

    calculateFrequencyData(timeData, sensorData) {
        const { uhvData, tevData, aeData } = sensorData;
        const uhvDataFreq = [];
        const tevDataFreq = [];
        const aeDataFreq = [];
        const dateLabels = [];
        
        let currentDate = null;
        let uhvDayData = [];
        let tevDayData = [];
        let aeDayData = [];

        const calculateFrequencyForDay = data => data.filter(value => value > 0.7).length;

        timeData.forEach((time, index) => {
            const date = time.split(' ')[0];
            
            if (currentDate !== date) {
                if (currentDate !== null) {
                    uhvDataFreq.push(calculateFrequencyForDay(uhvDayData));
                    tevDataFreq.push(calculateFrequencyForDay(tevDayData));
                    aeDataFreq.push(calculateFrequencyForDay(aeDayData));
                    dateLabels.push(currentDate);
                    
                    uhvDayData = [];
                    tevDayData = [];
                    aeDayData = [];
                }
                currentDate = date;
            }
            
            uhvDayData.push(uhvData[index]);
            tevDayData.push(tevData[index]);
            aeDayData.push(aeData[index]);
        });

        if (uhvDayData.length > 0) {
            uhvDataFreq.push(calculateFrequencyForDay(uhvDayData));
            tevDataFreq.push(calculateFrequencyForDay(tevDayData));
            aeDataFreq.push(calculateFrequencyForDay(aeDayData));
            dateLabels.push(currentDate);
        }

        return { uhvDataFreq, tevDataFreq, aeDataFreq, dateLabels };
    }
};