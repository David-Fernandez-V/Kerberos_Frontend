import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const registrationSchema = z.object({
    email: z
        .string()
        .min(1, requiredField)
        .email("Correo no válido")
    ,
    password: z
        .string()
        .min(1, requiredField)
    ,
})

export type registrationForm = z.infer<typeof registrationSchema>