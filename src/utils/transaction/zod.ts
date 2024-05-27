import { z as zod } from 'zod'
import { maskNumber } from 'utils/mask'

const message = 'Campo de preenchimento obrigatório'

export const zodTransactionSchema = zod.object({
  name: zod.string().min(1, { message }),
  date: zod.date().or(zod.string()),
  type: zod.enum(['in', 'out']),
  value: zod
    .string()
    .min(1, { message })
    .refine(data => maskNumber(data) > 0, 'Digite um valor válido'),
  category: zod.string().min(1, { message })
  // tags: zod.array({
  // })
})
