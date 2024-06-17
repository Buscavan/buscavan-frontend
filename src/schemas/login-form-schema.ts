import { z } from 'zod'

export const loginFormSchema = z.object({
  cpf: z
    .string({ required_error: 'Por favor, informe seu CPF' })
    .min(14, 'CPF inválido'),
  password: z
    .string({ required_error: 'Por favor, informe sua senha' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
