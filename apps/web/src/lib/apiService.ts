import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

const apiService = {
  getMonitoringPoints: async () => {
    const response = await axios.get(
      `${BACKEND_URL}/monitoring-point/all-monitoring-points`
    );
    return response.data;
  },
  createMonitoringPoint: async (machineId: number, data: { name: string }) => {
    const response = await axios.post(
      `${BACKEND_URL}/monitoring-point/${machineId}`,
      data
    );
    return response.data;
  },
  // Add other API functions as needed
};

export default apiService;
