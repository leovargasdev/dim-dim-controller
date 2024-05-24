export type TransactionType = 'in' | 'out'

type TransactionOut =
  | 'alimentacao'
  | 'assinaturas'
  | 'educacao'
  | 'investimento'
  | 'lazer'
  | 'moradia'
  | 'outros'
  | 'pessoal'
  | 'pet'
  | 'saude'
  | 'servicos'
  | 'transporte'
  | 'vestuario'
  | 'viagem'

type TransactionIn =
  | 'cashback'
  | 'outros'
  | 'premio'
  | 'investimento'
  | 'salario'

export type TransactionCategory = TransactionOut | TransactionIn

interface Base {
  name: string
  date: Date
  type: TransactionType
  category: TransactionCategory
}
export interface Transaction extends Base {
  id: string
  value: number
  created_at: Date
  monthFilter: string
}

export interface FormTransaction extends Base {
  value: string
}
