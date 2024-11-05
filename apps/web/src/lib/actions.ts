'use server';

import { authFetch } from './authFetch';
import { BACKEND_URL } from './constants';
import { CreateMachineSchema, FormState } from './type';

export const getProfile = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/protected`);

  const result = await response.json();
  return result;
};

export async function createMachine(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = CreateMachineSchema.safeParse({
    name: formData.get('name'),
    type: formData.get('type'),
  });

  // Add validation here if needed
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/machine/create-machine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    return { message: 'Machine created successfully!' };
  } else {
    return {
      message: response.statusText || 'Failed to create machine.',
    };
  }
}

export async function fetchAllMachines() {
  try {
    const response = await fetch(`${BACKEND_URL}/machine/all-machines`);
    if (!response.ok) {
      throw new Error('Failed to fetch machines');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching machines:', error);
    return []; // Return an empty array in case of error
  }
}

export async function createMonitoringPoint(name: string, machineId: number) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/monitoring-point/${machineId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create monitoring point');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating monitoring point:', error);
  }
}

export async function fetchAllMonitoringPoints() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/monitoring-point/all-monitoring-points`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch monitoring points');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching monitoring points:', error);
    return []; // Return an empty array in case of error
  }
}

export async function createSensor(model: string, monitoringPointId: number) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/sensor/${monitoringPointId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create sensor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating sensor:', error);
  }
}
