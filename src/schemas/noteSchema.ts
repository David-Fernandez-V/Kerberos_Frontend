import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const noteSchema = z.object({
    title: z
        .string()
        .min(1, requiredField)
    ,
    content: z
        .string()
        .min(1, requiredField)
    ,
    folder_id: z
        .string()
        .transform(val => val === "null" ? null : Number(val))
        .nullable()
    ,
    ask_master_password: z
        .boolean()
        .optional()
    ,
})

export type noteForm = z.infer<typeof noteSchema>