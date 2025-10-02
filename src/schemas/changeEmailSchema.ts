import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const ChangeEmailSchema = z.object({
    master_password: z
        .string({ required_error: "Campo requerido" })
        .min(1, requiredField)
    ,
    new_email: z
        .string()
        .min(1, requiredField)
        .email("Correo no válido")
    ,
})

export type  ChangeEmailForm = z.infer<typeof ChangeEmailSchema>