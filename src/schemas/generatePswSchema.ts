import {z} from "zod";

const requiredField = {message: "Campo requerido"}

export const generatePswSchema = z.object({
    length: z.number().min(1, requiredField),
    include_capital: z.boolean().optional(),
    include_lower: z.boolean().optional(),
    include_number: z.boolean().optional(),
    include_symbols: z.boolean().optional(),
    quantity_numbers: z.number().optional(),
    quantity_symbols: z.number().optional(),
})

export type generatePswForm = z.infer<typeof generatePswSchema>