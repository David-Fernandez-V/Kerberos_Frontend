import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const ChangeNameSchema = z.object({
    new_name: z
        .string()
        .min(1, requiredField)
    ,
})

export type  ChangeNameForm = z.infer<typeof ChangeNameSchema>