'use server';

import { authFetch } from './authFetch';
import { BACKEND_URL } from './constants';
import { CreateMachineSchema, FormState } from './type';

// import { getSession } from './session';

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
  console.log(validationFields.data.name);
  console.log(validationFields.data.type);

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

export async function getMachines() {
  const response = await fetch(`${BACKEND_URL}/machine/all-machines`, {
    method: 'GET',
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return {
      message: response.statusText || 'Failed to get machines.',
    };
  }
}
