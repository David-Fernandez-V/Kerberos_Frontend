import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const ChangePasswordSchema = z.object({
    master_password: z
        .string({ required_error: "Campo requerido" })
        .min(1, requiredField)
    ,
    new_password: z
        .string({ required_error: "Campo requerido" })
        .min(1, requiredField)
    ,
    confirm_password: z
        .string({ required_error: "Campo requerido" })
        .min(1, requiredField)
    ,
})

export type  ChangePasswordForm = z.infer<typeof ChangePasswordSchema>