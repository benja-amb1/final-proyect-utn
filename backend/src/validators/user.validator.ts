import { email, z } from 'zod';

const UserValidator = z.object({
  email: z.email("El email introducido no tiene formato correcto."),
  password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres.")
});

export const RegisterUser = UserValidator