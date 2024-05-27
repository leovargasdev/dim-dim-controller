import { FormTransaction } from 'types/transaction'

export const defaultValues: FormTransaction = {
  name: '',
  date: new Date(),
  type: 'out',
  category: 'alimentacao',
  value: '',
  tags: []
}
