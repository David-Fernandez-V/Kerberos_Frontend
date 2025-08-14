import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const generatePassphraseSchema = z.object({
    words_number: z.number().min(1, requiredField),
    separator: z.string().optional(),
    include_number: z.boolean(),
    include_symbol: z.boolean(),
    capitalize: z.boolean(),
    english: z.boolean(),
    spanish: z.boolean(),
})

export type generatePassphraseForm = z.infer<typeof generatePassphraseSchema>