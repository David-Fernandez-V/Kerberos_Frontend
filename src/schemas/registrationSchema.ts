import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string({ required_error: "Campo requerido" })
    .email("Correo no válido"),
  password: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo requerido" }),
  name: z
    .string({ required_error: "Campo requerido" })
    .min(2, { message: "Campo requerido" }),
});

export type registrationForm = z.infer<typeof registrationSchema>;
