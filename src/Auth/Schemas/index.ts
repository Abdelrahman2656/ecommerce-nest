import { z } from 'zod';
export const schemaSignup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();
export type signupZodDTO = z.infer<typeof schemaSignup>;
