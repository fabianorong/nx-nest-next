import axios from 'axios';
import { create } from 'domain';
import { fetchAllMachines } from './actions';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

const apiService = {
  createMachine: async (data: { name: string; type: string }) => {
    {
      const response = await axios.post(
        `${BACKEND_URL}/machine/create-machine`,
        data
      );
      return response.data;
    }
  },
  fetchAllMachines: async () => {
    const response = await axios.get(`${BACKEND_URL}/machine/all-machines`);
    return response.data;
  },
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
    if (response.status !== 201) {
      throw new Error('Failed to create monitoring point');
    }

    return response.data;
  },

  // Add other API functions as needed
};

export default apiService;
