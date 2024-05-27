export type TransactionType = 'in' | 'out'

type CategoryTypeOut =
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

type CategoryTypeIn =
  | 'cashback'
  | 'outros'
  | 'premio'
  | 'investimento'
  | 'salario'

export type CategoryType = CategoryTypeOut | CategoryTypeIn

interface Base {
  name: string
  date: Date
  type: TransactionType
  category: CategoryType
}
export interface Transaction extends Base {
  id: string
  value: number
  created_at: Date
  monthFilter: string
  tags: string[]
}

export interface FormTransaction extends Base {
  value: string
  tags: {
    id: string
    name: string
  }[]
}

export interface Category {
  value: CategoryType
  icon: React.ReactNode
  name: string
}
