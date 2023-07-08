export type TransationType = 'in' | 'out'

export interface Transation {
  name: string
  date: Date
  type: TransationType
  value: number
  category: number
}
