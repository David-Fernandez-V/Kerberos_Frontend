import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const passwordSchema = z.object({
    service_name: z
        .string()
        .min(1, requiredField)
    ,
    username: z
        .string()
        .min(1, requiredField)
    ,
    password: z
        .string()
        .min(1, requiredField)
    ,
    web_page: z
        .string()
        .url("URL no válida")
        .or(z.literal(""))
        .optional()
    ,
    folder_id: z
        .string()
        .transform(val => val === "null" ? null : Number(val))
        .nullable()
    ,
    notes: z
        .string()
        .optional()
    ,
    ask_master_password: z
        .boolean()
        .optional()
    ,
    strength: z
        .number()
})

export type passwordForm = z.infer<typeof passwordSchema>