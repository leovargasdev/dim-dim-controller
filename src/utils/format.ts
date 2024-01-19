import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { maskOnlyNumber } from './mask'

const dateFnsOptions = {
  locale: ptBR
}

export const formatDate = (
  value: string | Date,
  formatString: string
): string => {
  if (!value) {
    return ''
  }

  const date = typeof value === 'string' ? new Date(value) : value

  return format(date, formatString, dateFnsOptions)
}

export const formatCurrencyToFloat = (value: string): number => {
  let [numeral, cents] = value.split(',')
  numeral = maskOnlyNumber(numeral)

  return parseFloat(numeral + '.' + cents)
}

export const normalizeString = (value: string): string => {
  return value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
