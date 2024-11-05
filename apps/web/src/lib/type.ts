import { z } from 'zod';

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, {
      message: 'Contain at least one letter.',
    })
    .regex(/[0-9]/, {
      message: 'Contain at least one number.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, {
    message: 'Password field must not be empty.',
  }),
});

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
}

export enum MachineType {
  PUMP = 'PUMP',
  FAN = 'FAN',
}

export const CreateMachineSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    })
    .trim(),
  type: z.enum(['Fan', 'Pump'], { message: 'Type is required!' }),
});

export const CreateMonitoringPointSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    })
    .trim(),
  machineId: z.number().positive({ message: 'Machine ID is required!' }),
});

export interface Machine {
  id: number;
  name: string;
  type: string;
}

export interface MachineState {
  machines: Machine[];
  loading: boolean;
  error: string | null;
}

export interface MonitoringPoint {
  id: number;
  name: string;
  machine: Machine;
}

export interface MonitoringPointState {
  monitoringPoints: MonitoringPoint[];
  loading: boolean;
  error: string | null;
}
