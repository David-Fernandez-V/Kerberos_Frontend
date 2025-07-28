import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, requiredField)
        .email("Correo no válido")
    ,
    password: z
        .string()
        .min(1, requiredField)
    ,
    remember: z.boolean().optional()
})

export type loginForm = z.infer<typeof loginSchema>