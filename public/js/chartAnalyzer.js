// Chart analysis utilities
export const ChartAnalyzer = {
    /**
     * Analyzes energy data to count values above threshold in a date range
     * @param {Array} timeData - Array of time stamps
     * @param {Object} sensorData - Object containing UHV, TEV, and AE data arrays
     * @param {Date} startDate - Start date for analysis
     * @param {Date} endDate - End date for analysis
     * @param {number} threshold - Threshold value (default: 0.7)
     * @returns {Object} Counts of values above threshold for each sensor type
     */
    countHighEnergyEvents(timeData, sensorData, startDate, endDate, threshold = 0.7) {
        const counts = {
            uhv: 0,
            tev: 0,
            ae: 0
        };

        timeData.forEach((timeStr, index) => {
            const currentDate = new Date(timeStr);
            
            if (currentDate >= startDate && currentDate <= endDate) {
                if (sensorData.uhvData[index] > threshold) counts.uhv++;
                if (sensorData.tevData[index] > threshold) counts.tev++;
                if (sensorData.aeData[index] > threshold) counts.ae++;
            }
        });

        return counts;
    },

    /**
     * Gets the frequency of high energy events per day
     * @param {Array} timeData - Array of time stamps
     * @param {Object} sensorData - Object containing sensor data
     * @param {number} days - Number of days to analyze
     * @param {number} threshold - Threshold value
     * @returns {Object} Daily frequency of high energy events
     */
    getHighEnergyFrequency(timeData, sensorData, days = 7, threshold = 0.7) {
        const endDate = new Date(timeData[timeData.length - 1]);
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - days);

        const counts = this.countHighEnergyEvents(timeData, sensorData, startDate, endDate, threshold);
        
        return {
            uhvFrequency: counts.uhv / days,
            tevFrequency: counts.tev / days,
            aeFrequency: counts.ae / days,
            totalDays: days,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        };
    }
};

// Make ChartAnalyzer available globally
window.ChartAnalyzer = ChartAnalyzer;