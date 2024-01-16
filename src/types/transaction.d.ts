export type TransactionType = 'in' | 'out'

type TransactionCategory =
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

interface Base {
  name: string
  date: Date
  type: TransactionType
  category: TransactionCategory
}
export interface Transaction extends Base {
  value: number
  created_at: Date
  monthFilter: string
}

export interface FormTransaction extends Base {
  value: string
}
