import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { maskOnlyNumber } from './mask'

export const formatDate = (
  value: string | Date,
  formatString: string
): string => {
  if (value) {
    try {
      const date = typeof value === 'string' ? new Date(value) : value
      return format(date, formatString, { locale: ptBR })
    } catch (err) {
      console.log(err)
    }
  }

  return ''
}

export const convertCurrencyToFloat = (value: string): number => {
  let [numeral, cents] = value.split(',')
  numeral = maskOnlyNumber(numeral)

  return parseFloat(numeral + '.' + cents)
}

export const convertFloatToCurrency = (currency: number) => {
  const config = { currency: 'BRL', style: 'currency' }
  return new Intl.NumberFormat('pt-BR', config).format(currency)
}

export const normalizeString = (value: string): string => {
  return value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
