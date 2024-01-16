import { z as zod } from 'zod'

const message = 'Campo de preenchimento obrigatório'

export const zodTransactionSchema = zod.object({
  name: zod.string().min(1, { message }),
  date: zod.date().or(zod.string()),
  type: zod.enum(['in', 'out']),
  value: zod.string().min(1, { message }),
  category: zod.string().min(1, { message })
})
