import { z } from "zod";

const requiredField = { message: "Campo requerido" };

export const cardSchema = z.object({
  alias: z.string().min(1, requiredField),

  cardholder_name: z.string().min(1, requiredField),

  number: z
    .string()
    .min(1, requiredField)
    .transform(val => val.replace(/\s/g, ""))
    .refine((val) => /^\d{16}$/.test(val), {
      message: "Debe contener exactamente 16 dígitos numéricos",
    }),

  expiration_month: z
    .string()
    .min(1, requiredField)
    .refine((val) => /^\d{2}$/.test(val), {
      message: "Debe ser un mes válido (MM)",
    })
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, {
      message: "El mes debe estar entre 01 y 12",
    }),

  expiration_year: z
    .string()
    .min(1, requiredField)
    .refine((val) => /^\d{4}$/.test(val), {
      message: "4 dígitos (AAAA)",
    }),
    // .refine((val) => parseInt(val) >= new Date().getFullYear(), {
    //   message: "El año debe ser mayor o igual al actual",
    // }),

  type: z.string().optional(),

  csv: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{3,4}$/.test(val), {
      message: "3 o 4 dígitos",
    }),

  brand: z.string().optional(),

  notes: z.string().optional(),

  folder_id: z
    .string()
    .transform((val) => (val === "null" ? null : Number(val)))
    .nullable(),

  ask_master_password: z.boolean().optional(),
});


export type cardForm = z.infer<typeof cardSchema>