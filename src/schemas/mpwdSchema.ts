import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const mpwdSchema = z.object({
    mpwd: z
        .string()
        .min(1, requiredField)
    ,
})

export type mpwdForm = z.infer<typeof mpwdSchema>