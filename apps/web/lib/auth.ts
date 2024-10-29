'use server';

import { redirect } from 'next/navigation';
import { BACKEND_URL } from './constants';
import { FormState, LoginFormSchema, SignupFormSchema } from './type';
import { createSession } from './session';

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect('/auth/signin');
  } else
    return {
      message:
        response.status === 409
          ? 'Account with this email already exists.' +
            ' Please try another email.'
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    await createSession({
      user: {
        id: result.id,
        name: result.name,
        role: result.role,
      },
    });
    redirect('/');
  } else {
    return {
      message:
        response.status === 401 ? 'Invalid Credentials!' : response.statusText,
    };
  }
}
