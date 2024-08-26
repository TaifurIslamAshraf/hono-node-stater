import { validator } from 'hono/validator';
import { z } from 'zod';
import { validateSchema } from './validator';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const loginValidator = validator('json', (value, c) => {
    return validateSchema(c, loginSchema, value);
});

const registerSchema = loginSchema.extend({
    fullName: z.string().min(1).max(20),
    age: z.number().lte(100),
});

const registerValidator = validator('json', (value, c) => {
    return validateSchema(c, registerSchema, value);
});

type LoginBody = z.infer<typeof loginSchema>;
type RegistrationBody = z.infer<typeof registerSchema>;

export const userValidator = { loginValidator, registerValidator };
export { LoginBody, RegistrationBody };
