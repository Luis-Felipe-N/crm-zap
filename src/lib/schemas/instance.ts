import z from "zod";

export const createInstanceSchema = z.object({
  instanceName: z
    .string()
    .min(3, "O nome da instância deve ter pelo menos 3 caracteres."),
  phoneNumber: z
    .string()
    .regex(
      /^\+\d+$/,
      "O número de telefone deve estar em formato internacional (ex: +5563912345678).",
    ),
});

export type CreateInstanceData = z.infer<typeof createInstanceSchema>;