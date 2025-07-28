import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const folderSchema = z.object({
    name: z
        .string()
        .min(1, requiredField)
    ,
})

export type folderForm = z.infer<typeof folderSchema>