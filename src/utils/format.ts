import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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

  return format(date, formatString)
}
