import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario es requerido',
    }),
    email: z.string({
        required_error: 'Email es requerido',
    }).email({
        message:"Email invalido",
    }),
    password: z.string({
        required_error: 'Contraseña es requerida',
    }).min(6, {
        message: 'Contraseña debe ser de al menos 6 caracteres',
    }),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email requerido',
    }).email({
        message: 'Email invalido',
    }),
    password: z.string({
        required_error: 'Contraseña requerida',
    }).min(6, {
        message: 'Contraseña debe ser de al menos 6 caracteres',
    }),
});
