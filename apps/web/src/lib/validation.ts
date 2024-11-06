import { z } from 'zod';

export const CreateMachineSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    })
    .trim(),
  type: z.enum(['Fan', 'Pump'], { message: 'Type is required!' }),
});
